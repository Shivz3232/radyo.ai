import React, { useEffect, useState } from 'react';
import AudioCards from '../components/AudioCard/AudioCards';
import { categoryDataLinks } from '../components/CategoryNavBar/categoryData';
import CategoryNavBar from '../components/CategoryNavBar/CategoryNavBar';
import WelcomeModal from '../components/Modal/WelcomeModal';
import { Result } from '../components/PodcastSearch/Result';
import SearchBar from '../components/PodcastSearch/SearchBar';
import { getAllAudio, getAudioCategories } from '../controllers/podcast';
import { getTrendingPlaylists } from '../controllers/playlist';
import { useSessionStorage } from '../hooks/sessionStorage';
import dbConnect from '../utils/dbConnect';
import HomeCarousel from './../components/HomeCarousel/HomeCarousel';
// import Banner1 from '../assets/Banner_Radyo.svg';
// import Banner2 from '../assets/Banner_English_artist.jpg';
// import Banner3 from '../assets/Banner_English_Listener.jpg';
// import Banner4 from '../assets/Banner_Hindi_artist.jpg';
import { initGA, trackPageView } from '../components/Tracking/tracking';
import TrendingArtist from '../components/TrendingArtist/TrendingArtist';
import { getTrendingCreators } from '../controllers/creator';
import PlaylistCards from '../components/PlaylistCard/PlaylistCards';
import dynamic from 'next/dynamic'
const checkforSW = dynamic(() => import('../utils/pushNotification/pushNotification'));
import { useRouter } from 'next/router';

import axios from 'axios';
const Podcast = props => {
  const router = useRouter();
  const [audioCards, setAudioCards] = useState(props.audioCards);
  const [playlistCards, setPlaylistCards] = useState(props.playlistCards);
  const [trendingCreators, setTrendingCreators] = useState(
    props.trendingCreators
  );
  const [showWelcomeModal, setshowWelcomeModal] = useState('hidden');
  const [searchResults, setSearchResults] = useState({
    searched: false,
    loading: false,
    query: '',
    data: [],
  });

  const [showmodal, setShowModal] = useSessionStorage('endModalSession', false);
  const images = [
    { img: "https://res.cloudinary.com/nuzpapr-tech/image/upload/v1639682690/banners/Banner_Radyo_b7xe4s.svg", url: '/' },
    { img: "https://res.cloudinary.com/nuzpapr-tech/image/upload/v1639682718/banners/Banner_English_artist_kuaibk.png", url: '/contest' },
    { img: "https://res.cloudinary.com/nuzpapr-tech/image/upload/v1639682717/banners/Banner_English_Listener_bsladt.png", url: '/contest' },
    { img: "https://res.cloudinary.com/nuzpapr-tech/image/upload/v1639682717/banners/Banner_Hindi_artist_krypgj.png", url: '/contest' },
  ];

  useEffect(() => {
    axios
      .get(`/api/hydrate/audio/get_audio`)
      .then(res => {
        // console.log(res.data.allAudio[0]);
        if (res.data.allAudio && res.data.allAudio.length) {
          setAudioCards(res.data.allAudio);
        }
      })
      .catch(err => {
        console.log(err);
      });

    initGA();
    trackPageView();
  }, []);

  useEffect(() => {
    if (showmodal != true) {
      setShowModal(true);
      setTimeout(() => {
        setshowWelcomeModal('visible');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', e => {
      if (e === '/') {
        checkforSW();
      }
    });
  }, [router.events]);

  return (
    <>
      <WelcomeModal
        showWelcomeModal={showWelcomeModal}
        setshowWelcomeModal={setshowWelcomeModal}
      />
      <div className="podcast-page">
        <CategoryNavBar category="all" />
        <div className="container">
          <div className="flex justify-center">
            <HomeCarousel images={images} />
          </div>
          <div className="hidden h-20" id="searchbar"></div>
          <SearchBar
            category={'category'}
            data={searchResults}
            setData={setSearchResults}
          />
          {searchResults.searched ? (
            <Result
              query={searchResults.query}
              data={searchResults.data}
              loading={searchResults.loading}
              category={false}
            />
          ) : audioCards ? (
            <>
              <TrendingArtist
                heading="Trending artist"
                data={trendingCreators}
              />
              <AudioCards
                categoryName="New Releases"
                cardItems={audioCards.slice(0, 15)}
              />
              <AudioCards
                categoryName="Trending audios"
                cardItems={audioCards
                  .filter(e => {
                    const publishDate = new Date(e.createdAt);
                    const lastDate = new Date();
                    lastDate.setDate(lastDate.getDate() - 15);
                    return publishDate >= lastDate;
                  })
                  .splice(0, 15)
                  .sort((a, b) => {
                    return a.playCount < b.playCount ? 1 : -1;
                  })}
              />

              {categoryDataLinks.map((elem, i) => {
                if (audioCards.filter(e => e.category === elem.id).length) {
                  return (
                    <AudioCards
                      key={i}
                      categoryName={elem.label}
                      cardItems={audioCards.filter(e => e.category === elem.id)}
                    />
                  );
                }
              })}

              <PlaylistCards
                categoryName="Trending Playlists"
                cardItems={playlistCards}
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const audioCards = await getAllAudio().catch(console.error);
  const categories = await getAudioCategories().catch(console.error);
  const playlistCards = await getTrendingPlaylists().catch(console.error);
  const trendingCreators = await getTrendingCreators().catch(console.error);
  if (audioCards && categories && trendingCreators) {
    const allCategories = [];
    categories.forEach(e => {
      if (!allCategories.includes(e.category)) allCategories.push(e.category);
    });
    return {
      props: {
        audioCards,
        playlistCards,
        allCategories,
        trendingCreators,
        activeTab: 'home',
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {},
      revalidate: 60,
    };
  }
}
export default Podcast;
