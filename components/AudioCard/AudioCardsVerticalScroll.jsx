import React from 'react';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import AudioCard from './AudioCard';

const AudioCardsVerticalScroll = ({ audioCards, playAudio }) => {
  const { setContextPlaylist } = usePlaylist();
  return (
    <div
      className="podcast-category-cards"
      onClick={() => {
        setContextPlaylist(audioCards);
      }}
    >
      {audioCards.map(item => {
        return (
          <AudioCard playAudio={playAudio} cardItemData={item} key={item._id} />
        );
      })}
    </div>
  );
};

export default AudioCardsVerticalScroll;
