import React from 'react';
import PodcastReviewCard from './PodcastReviewCard';

const PodcastReviewCards = ({ podcasts, approve, reject, showReport }) => {
  return (
    <div className="podcast-review-cards">
      {podcasts.map(podcast => (
        <PodcastReviewCard
          key={podcast._id}
          podcast={podcast}
          approve={approve}
          reject={reject}
          showReport={showReport}
        />
      ))}
    </div>
  );
};

export default PodcastReviewCards;
