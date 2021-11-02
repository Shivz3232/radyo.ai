import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AudioCardsVerticalScroll from '../../components/AudioCard/AudioCardsVerticalScroll';
import CategoryNavBar from '../../components/CategoryNavBar/CategoryNavBar';
import { Result } from '../../components/PodcastSearch/Result';
import SearchBar from '../../components/PodcastSearch/SearchBar';
import {
  getAudioCategories,
  getCategoryAudio,
} from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';
import NoResult from '../../assets/NoResultsFound.png';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import { BiSortAlt2 } from 'react-icons/bi';
import SortButton from '../../components/SortButton/SortButton';

const PodcastCategory = props => {
  const [audioCards, setAudioCards] = useState(props.audioCards);
  const [searchResults, setSearchResults] = useState({
    searched: false,
    loading: false,
    query: '',
    data: [],
  });
  // const [sort, setSort] = useState('');

  useEffect(() => {
    axios
      .get(`/api/hydrate/audio/get_audio?category=${props.category}`)
      .then(res => {
        console.log(res.data.allAudio);
        setAudioCards(res.data.allAudio);
      })
      .catch(err => console.log(err));
  }, [props.category]);

  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

  function loadMorePodcast() {
    if (audioCards.length) {
      const lastPodcastId = audioCards[audioCards.length - 1]._id;
      axios
        .get(`/api/category/${props.category}?lastPodcastId=${lastPodcastId}`)
        .then(response => {
          let d = response.data.allAudio;
          // console.log(d);
          setAudioCards(
            audioCards.concat(
              d
              // .sort((a, b) => {
              //   if (sort === 'LIKE') {
              //     return by(a.likeCount, b.likeCount);
              //   } else if (sort === 'LIKE-ASC') {
              //     return by(a.likeCount, b.likeCount, true);
              //   } else if (sort === 'PLAY') {
              //     return by(a.playCount, b.playCount);
              //   } else if (sort === 'PLAY-ASC') {
              //     return by(a.playCount, b.playCount, true);
              //   } else if ('NEWEST') {
              //     return by(new Date(a.createdAt), new Date(b.playCount));
              //   } else if ('OLDEST') {
              //     return by(new Date(a.createdAt), new Date(b.playCount), true);
              //   } else return 0;
              // })
            )
          );
        })
        .catch(console.error);
    }
  }
  // const by = (a, b, asc = false) => {
  //   if (asc === true) {
  //     return a > b ? 1 : -1;
  //   } else {
  //     return a < b ? 1 : -1;
  //   }
  // };

  // function sortBy(sortingFunc) {
  //   if (sortingFunc === 'LIKE') {
  //     setSort('LIKE');
  //     setAudioCards(
  //       audioCards.sort((a, b) => {
  //         return by(a.likeCount, b.likeCount);
  //       })
  //     );
  //   } else if (sortingFunc === 'PLAY') {
  //     setSort('PLAY');
  //     setAudioCards(
  //       audioCards.sort((a, b) => {
  //         return by(a.playCount, b.playCount);
  //       })
  //     );
  //   } else if (sortingFunc === 'LIKE-ASC') {
  //     setSort('LIKE-ASC');
  //     setAudioCards(
  //       audioCards.sort((a, b) => {
  //         return by(a.likeCount, b.likeCount, true);
  //       })
  //     );
  //   } else if (sortingFunc === 'PLAY-ASC') {
  //     setSort('PLAY-ASC');
  //     setAudioCards(
  //       audioCards.sort((a, b) => {
  //         return by(a.playCount, b.playCount, true);
  //       })
  //     );
  //   } else if ('NEWEST') {
  //     setSort('NEWEST');
  //     setAudioCards(
  //       audioCards.sort((a, b) => {
  //         return by(new Date(a.createdAt), new Date(b.playCount));
  //       })
  //     );
  //   } else if ('OLDEST') {
  //     setSort('OLDEST');
  //     setAudioCards(
  //       audioCards.sort((a, b) => {
  //         return by(new Date(a.createdAt), new Date(b.playCount), true);
  //       })
  //     );
  //   }
  // }

  return (
    <div className="podcast-category-page">
      <CategoryNavBar category={props.category} />
      <div className="container">
        <SearchBar
          category={props.category}
          data={searchResults}
          setData={setSearchResults}
        />
        {searchResults && searchResults.searched && (
          <Result
            data={searchResults.data}
            loading={searchResults.loading}
            query={searchResults.query}
            category={props.category}
          />
        )}
      </div>
      {/* <div
        className="container flex items-center justify-end"
        style={{ marginTop: '0', marginBottom: '0.25rem' }}
      >
        <SortButton sortBy={sortBy} />
      </div> */}
      {!searchResults.searched && (
        <InfiniteScroll
          className="no-scrollbar"
          style={{ padding: '0.5rem' }}
          dataLength={audioCards.length}
          next={loadMorePodcast}
          hasMore={true}
          height={'65vh'}
          loader={<p></p>}
        >
          <div className="container">
            {audioCards && audioCards.length ? (
              audioCards && <AudioCardsVerticalScroll audioCards={audioCards} />
            ) : (
              <div className="not-found">
                <div className="flex items-center justify-center flex-row">
                  <img
                    className="h-64"
                    src={NoResult.src}
                    alt="no audio found, start adding audio"
                  />
                </div>
                <div className="flex items-center justify-center flex-row">
                  <div className="mobile:w-5/6 ipad:text-2xl text-center">
                    No audio found for this category, start adding an audio
                  </div>
                </div>
              </div>
            )}
          </div>
        </InfiniteScroll>
      )}
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
        activeTab: 'categories',
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
