import React from 'react';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import NoResult from '../../assets/NoResultsFound.png';
import AudioCard from './AudioCard';

const AudioCardsVerticalScroll = ({ audioCards }) => {
  const { setContextPlaylist } = usePlaylist();
  if (audioCards && audioCards.length > 0)
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
  else
    return (
      <p className="flex items-center justify-center">
        <img className="h-20" src={NoResult.src} alt="no match" />
        <strong>No match found</strong>
      </p>
    );
};

export default AudioCardsVerticalScroll;
