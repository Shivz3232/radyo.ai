import React from 'react';
import PodcastReviewCard from './PodcastReviewCard';

const PodcastReviewCards = ({ podcasts, playAudio, approve, reject }) => {
  return (
    <div className="podcast-review-cards">
      {podcasts.map(podcast => (
        <PodcastReviewCard
          key={podcast._id}
          podcast={podcast}
          playAudio={playAudio}
          approve={approve}
          reject={reject}
        />
      ))}
    </div>
  );
};

export default PodcastReviewCards;
