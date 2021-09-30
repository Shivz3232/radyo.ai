// import Banner from './../../../components/Banner/Banner';
// import PillsNav from './../../../components/PillsNav/PillsNav';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AudioCardsVerticalScroll from '../../components/AudioCard/AudioCardsVerticalScroll';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import { Result } from '../../components/PodcastSearch/Result';
import SearchBar from '../../components/PodcastSearch/SearchBar';
import {
  getAudioCategories,
  getCategoryAudio,
} from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';

const PodcastCategory = props => {
  const [audioCards, setAudioCards] = useState(props.audioCards);
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

  useEffect(() => {
    setAudioCards(props.audioCards);
  }, [props]);

  function loadMorePodcast() {
    if (audioCards.length) {
      const lastPodcastId = audioCards[audioCards.length - 1]._id;
      axios
        .get(`/api/category/${props.category}?lastPodcastId=${lastPodcastId}`)
        .then(response => {
          let d = response.data.allAudio;
          // console.log(d);
          setAudioCards(audioCards.concat(d));
        })
        .catch(console.error);
    }
  }
  return (
    <div className="podcast-category-page">
      {/* <Banner size="sm" /> */}
      {/* <PillsNav category={props.category} type="podcast" /> */}
      <div className="container">
        <SearchBar
          category={props.category}
          data={searchResults}
          setData={setSearchResults}
        />
        {searchResults && searchResults.searched && (
          <Result
            playAudio={playAudio}
            data={searchResults.data}
            loading={searchResults.loading}
            query={searchResults.query}
            category={props.category}
          />
        )}
      </div>
      {!searchResults.searched && (
        <InfiniteScroll
          style={{ padding: '0.5rem' }}
          dataLength={audioCards.length}
          next={loadMorePodcast}
          hasMore={true}
          height="85vh"
          loader={<p></p>}
        >
          <div className="container">
            {audioCards && audioCards.length ? (
              <AudioCardsVerticalScroll
                audioCards={audioCards}
                playAudio={playAudio}
              />
            ) : (
              <div className="not-found">
                start adding audio to this category
              </div>
            )}
          </div>
        </InfiniteScroll>
      )}
      <div
        className="audio-player-dashboard"
        style={{ display: trackInfo.audioSrc ? '' : 'none' }}
      >
        <AudioPlayer trackInfo={trackInfo} />
      </div>
    </div>
  );
};
export async function getStaticProps({ params }) {
  await dbConnect();
  const category = params.categoryName;
  const audioCards = await getCategoryAudio(category).catch(console.error);
  if (audioCards) {
    return {
      props: {
        category: category,
        audioCards,
        activeTab: '/category/cat-1',
      },
      revalidate: 30 * 60,
    };
  } else {
    return {
      props: {},
      revalidate: 30 * 60,
    };
  }
}

export async function getStaticPaths() {
  await dbConnect();
  const categories = await getAudioCategories().catch(console.error);

  if (categories) {
    let paths = categories.map(elem => {
      return { params: { categoryName: elem.category } };
    });
    return {
      paths: paths,
      fallback: 'blocking',
    };
  } else {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export default PodcastCategory;
