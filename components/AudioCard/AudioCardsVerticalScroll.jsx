import React from 'react';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import AudioCard from './AudioCard';

const AudioCardsVerticalScroll = ({ audioCards }) => {
  const { setContextPlaylist } = usePlaylist();
  return (
    <div
      className="podcast-category-cards"
      onClick={() => {
        setContextPlaylist(audioCards);
      }}
    >
      {audioCards.map(item => {
        return <AudioCard cardItemData={item} key={item._id} />;
      })}
    </div>
  );
};

export default AudioCardsVerticalScroll;
