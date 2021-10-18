import React, { useEffect, useState } from 'react';
import AudioCards from '../components/AudioCard/AudioCards';
import { categoryDataLinks } from '../components/CategoryNavBar/categoryData';
import CategoryNavBar from '../components/CategoryNavBar/CategoryNavBar';
import WelcomeModal from '../components/Modal/WelcomeModal';
import { Result } from '../components/PodcastSearch/Result';
import SearchBar from '../components/PodcastSearch/SearchBar';
import { getAllAudio, getAudioCategories } from '../controllers/podcast';
import { useSessionStorage } from '../hooks/sessionStorage';
import dbConnect from '../utils/dbConnect';
import HomeCarousel from './../components/HomeCarousel/HomeCarousel';
import Banner1 from '../assets/Banner_Radyo.svg';
import Banner2 from '../assets/Banner_English_artist.svg';
import Banner3 from '../assets/Banner_English_Listener.svg';
import Banner4 from '../assets/Banner_Hindi_artist.svg';
import { initGA, trackPageView } from '../components/Tracking/tracking';
import TrendingArtist from '../components/TrendingArtist/TrendingArtist';
import { getTrendingCreators } from '../controllers/creator';
const Podcast = ({ audioCards, trendingCreators }) => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  const [showWelcomeModal, setshowWelcomeModal] = useState('hidden');
  const [searchResults, setSearchResults] = useState({
    searched: false,
    loading: false,
    query: '',
    data: [],
  });

  const [showmodal, setShowModal] = useSessionStorage('endModalSession', false);
  const images = [Banner1.src, Banner2.src, Banner3.src, Banner4.src];

  useEffect(() => {
    if (showmodal != true) {
      setShowModal(true);
      setTimeout(() => {
        setshowWelcomeModal('visible');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <AudioCards
                categoryName="New Releases"
                cardItems={audioCards.slice(0, 15)}
              />
              <AudioCards
                categoryName="Trending audios"
                cardItems={audioCards.slice(0, 15)}
              />
              <TrendingArtist
                heading="Trending artist"
                data={trendingCreators}
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
  const trendingCreators = await getTrendingCreators().catch(console.error);
  if (audioCards && categories && trendingCreators) {
    const allCategories = [];
    categories.forEach(e => {
      if (!allCategories.includes(e.category)) allCategories.push(e.category);
    });
    return {
      props: {
        audioCards,
        allCategories,
        trendingCreators,
        activeTab: 'home',
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {},
    };
  }
}
export default Podcast;
