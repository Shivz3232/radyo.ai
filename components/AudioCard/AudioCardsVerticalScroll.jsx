import React from 'react';
import AudioCard from './AudioCard';

const AudioCardsVerticalScroll = ({ audioCards, playAudio }) => {
  return (
    <div className="podcast-category-cards">
      {audioCards.map(item => {
        return (
          <AudioCard playAudio={playAudio} cardItemData={item} key={item._id} />
        );
      })}
    </div>
  );
};

export default AudioCardsVerticalScroll;
