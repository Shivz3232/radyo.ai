import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AudioCards from '../components/AudioCard/AudioCards';
// import PillsNav from './../../components/PillsNav/PillsNav';
// import Banner from './../../components/Banner/Banner';
import { getAllAudio, getAudioCategories } from '../controllers/podcast';
import dbConnect from '../utils/dbConnect';
import { Result } from '../components/PodcastSearch/Result';
import SearchBar from '../components/PodcastSearch/SearchBar';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import { PodcastCategoriesLinks } from './../components/NavBar/categories';

const Podcast = ({ audioCards, allCategories }) => {
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

  const playAudio = info => {
    setTrackInfo(info);
  };
  return (
    <div className="podcast-page">
      {/* <Banner size="sm" /> */}
      {/* <PillsNav category="all" type="podcast" /> */}
      <div className="container">
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
              playAudio={playAudio}
              categoryName="New Releases"
              cardItems={audioCards.slice(0, 15)}
            />
            {PodcastCategoriesLinks.map((elem, i) => {
              if (audioCards.filter(e => e.category === elem.id).length) {
                return (
                  <AudioCards
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
      <div
        className="audio-player-dashboard"
        style={{ display: trackInfo.audioSrc ? '' : 'none' }}
      >
        <AudioPlayer trackInfo={trackInfo} />
      </div>
    </div>
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
