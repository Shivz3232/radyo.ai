import React, { useEffect, useState, Component } from 'react';
import AudioCards from '../components/AudioCard/AudioCards';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import CategoryNavBar from '../components/CategoryNavBar/CategoryNavBar';
import { Result } from '../components/PodcastSearch/Result';
import SearchBar from '../components/PodcastSearch/SearchBar';
import { getAllAudio, getAudioCategories } from '../controllers/podcast';
import dbConnect from '../utils/dbConnect';
import { categoryDataLinks } from '../components/CategoryNavBar/categoryData';
import HomeCarousel from './../components/HomeCarousel/HomeCarousel';
import WelcomeModal from '../components/Modal/WelcomeModal';
import { useSessionStorage } from '../hooks/sessionStorage';

const Podcast = ({ audioCards, allCategories, play, setPlaylist }) => {
  const [showWelcomeModal, setshowWelcomeModal] = useState('hidden');
  const [searchResults, setSearchResults] = useState({
    searched: false,
    loading: false,
    query: '',
    data: [],
  });
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });
  const [showmodal, setShowModal] = useSessionStorage('endModalSession', false);
  const images = [
    'https://via.placeholder.com/411x256',
    'https://via.placeholder.com/1024x320',
    'https://via.placeholder.com/411x256',
    'https://via.placeholder.com/1024x320',
  ];

  const playAudio = info => {
    setTrackInfo(info);
    play(info);
  };

  useEffect(() => {
    if (showmodal != true) {
      setShowModal(true);
      setTimeout(() => {
        setshowWelcomeModal('visible');
      }, 2000);
    }
    const player = document.querySelector('#audio-player');
    player.classList.remove('absolute');
    player.classList.add('fixed');
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
          {/* <div className="h-16 w-0 text-white hidden" id="search-bar-start">
            ....
          </div> */}
          <SearchBar
            category={'category'}
            data={searchResults}
            setData={setSearchResults}
          />
          {searchResults.searched ? (
            <Result
              playAudio={playAudio}
              query={searchResults.query}
              data={searchResults.data}
              loading={searchResults.loading}
              category={false}
            />
          ) : audioCards ? (
            <>
              <AudioCards
                setPlaylist={setPlaylist}
                playAudio={playAudio}
                categoryName="New Releases"
                cardItems={audioCards.slice(0, 15)}
              />
              {categoryDataLinks.map((elem, i) => {
                if (audioCards.filter(e => e.category === elem.id).length) {
                  return (
                    <AudioCards
                      setPlaylist={setPlaylist}
                      playAudio={playAudio}
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
        {/* <div
        className="audio-player-dashboard"
        style={{ display: trackInfo.audioSrc ? '' : 'none' }}
      >
        <AudioPlayer trackInfo={trackInfo} />
      </div> */}
      </div>
    </>
  );
};

export async function getStaticProps() {
  await dbConnect();
  const audioCards = await getAllAudio().catch(console.error);
  const categories = await getAudioCategories().catch(console.error);
  if (audioCards && categories) {
    const allCategories = [];
    categories.forEach(e => {
      if (!allCategories.includes(e.category)) allCategories.push(e.category);
    });
    return {
      props: {
        audioCards,
        allCategories,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
export default Podcast;
