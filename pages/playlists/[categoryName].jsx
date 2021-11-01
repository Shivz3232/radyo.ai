import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlaylistCardsVerticalScroll from '../../components/PlaylistCard/PlaylistCardsVerticalScroll';
import CategoryNavBar from '../../components/CategoryNavBar/CategoryNavBar';
import { Result } from '../../components/PodcastSearch/Result';
import SearchBar from '../../components/PodcastSearch/SearchBar';
import { getAllPlaylists } from '../../controllers/playlist';
import dbConnect from '../../utils/dbConnect';
import NoResult from '../../assets/NoResultsFound.png';
import { initGA, trackPageView } from '../../components/Tracking/tracking';

const PlaylistCategory = props => {
  const [playlistCards, setPlaylistCards] = useState(props.playlistCards);
  const [searchResults, setSearchResults] = useState({
    searched: false,
    loading: false,
    query: '',
    data: [],
  });
  const [sort, setSort] = useState('');

  useEffect(() => {
    axios
      .get(`/api/hydrate/playlist/getplaylists`)
      .then(res => {
        if (res.data.allPlaylists && res.data.allPlaylists.length) {
          setPlaylistCards(res.data.allPlaylists);
        }
      })
      .catch(err => console.log(err));
  }, [props.category, sort]);

  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

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
      {!searchResults.searched && (
        <InfiniteScroll
          className="no-scrollbar"
          style={{ padding: '0.5rem' }}
          dataLength={playlistCards.length}
          hasMore={true}
          height={'65vh'}
          loader={<p></p>}
        >
          <div className="container">
            {playlistCards && playlistCards.length ? (
              playlistCards && (
                <PlaylistCardsVerticalScroll playlistCards={playlistCards} />
              )
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
  const playlistCards = await getAllPlaylists().catch(console.error);
  if (playlistCards) {
    return {
      props: {
        category: params.categoryName,
        playlistCards,
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
  return {
    paths: [{ params: { categoryName: 'playlist' } }],
    fallback: 'blocking',
  };
}

export default PlaylistCategory;
