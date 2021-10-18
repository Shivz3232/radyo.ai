import React, { useEffect } from 'react';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import NoResult from '../../assets/NoResultsFound.png';
import AudioCard from './AudioCard';
import Adcard from './../AdCard/Adcard';

const AudioCardsVerticalScroll = ({ audioCards }) => {
  const { setContextPlaylist } = usePlaylist();
  const [origin, setOrigin] = useState();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  function getMixedCards() {
    const cards = [];

    for (var i = 0, j = 1; i < audioCards.length; i++, j++) {
      if (j % 5 === 0) {
        cards.push(
          <div key={`google-card-${j+i}`} className="audio-card mini generic-card p-0">
            <Adcard />
          </div>
        );
      }

      cards.push(<AudioCard key={i} origin={origin} cardItemData={audioCards[i]} />);
    }

    return cards;
  }
  if (audioCards && audioCards.length > 0)
    return (
      <div
        className="podcast-category-cards"
        onClick={() => {
          setContextPlaylist(audioCards);
        }}
      >
        {getMixedCards()}
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
