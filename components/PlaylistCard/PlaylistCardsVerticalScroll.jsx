import React, { useEffect, useState } from 'react';
import NoResult from '../../assets/NoResultsFound.png';
import PlaylistCard from './PlaylistCard';
import Adcard from './../AdCard/Adcard';

const PlaylistCardsVerticalScroll = props => {
  const [playlistCards, setPlaylistCards] = useState(props.playlistCards);
  const [origin, setOrigin] = useState();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    setPlaylistCards(props.playlistCards);
  }, [props, playlistCards]);

  function getMixedCards() {
    const cards = [];

    for (var i = 0, j = 1; i < playlistCards.length; i++, j++) {
      /*
      if (j % 5 === 0) {
        cards.push(
          <div
            key={`google-card-${j + i}`}
            className="audio-card mini generic-card p-0"
          >
            <Adcard />
          </div>
        );
      }
      */
      cards.push(
        <PlaylistCard key={i} origin={origin} cardItemData={playlistCards[i]} />
      );
    }

    return cards;
  }
  if (playlistCards && playlistCards.length > 0)
    return (
      <div className="podcast-category-cards">
        {playlistCards && getMixedCards()}
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

export default PlaylistCardsVerticalScroll;
