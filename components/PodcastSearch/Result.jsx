import axios from 'axios';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AudioCards from '../AudioCard/AudioCards';
import AudioCardsVerticalScroll from '../AudioCard/AudioCardsVerticalScroll';

export const Result = ({ data, loading, category, query }) => {
  const [results, setResults] = useState({
    categoryResults: [],
    allResults: [],
  });

  useEffect(() => {
    if (category) {
      setResults({
        categoryResults: data.filter(e => e.category === category),
        allResults: data.filter(e => e.category !== category),
      });
    } else {
      setResults({
        categoryResults: null,
        allResults: data,
      });
    }
  }, [category, data]);

  function loadMorePodcast() {
    if (results.allResults.length) {
      // console.log('initiate');
      const lastPodcastId =
        results.allResults[results.allResults.length - 1]._id;
      axios
        .get(`/api/search?query=${query}&lastPodcastId=${lastPodcastId}`)
        .then(response => {
          let d, c;
          if (category) {
            d = response.data.allAudio.filter(e => e.category !== category);
            // c = response.data.allAudio.filter(e => e.category === category);
          } else {
            d = response.data.allAudio;
          }
          setResults({
            ...results,
            // categoryResults: results.categoryResults.concat(c),
            allResults: results.allResults.concat(d),
          });
          // console.log('response');
        })
        .catch(console.error);
    }
  }

  return (
    <div className="search-results">
      {category && (
        <AudioCards
          categoryName={`${category} (${results.categoryResults.length})`}
          cardItems={results.categoryResults}
        />
      )}
      <h2 className="result-heading">{`All Results (${results.allResults.length})`}</h2>
      {data && (
        <InfiniteScroll
          style={{ padding: '6px' }}
          dataLength={results.allResults.length}
          next={loadMorePodcast}
          hasMore={true}
          height="75vh"
          loader={<p></p>}
        >
          <AudioCardsVerticalScroll audioCards={[...results.allResults]} />
        </InfiniteScroll>
      )}
    </div>
  );
};
