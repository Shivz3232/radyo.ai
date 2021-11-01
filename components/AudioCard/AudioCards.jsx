import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import NoResult from '../../assets/NoResultsFound.png';
import Adcard from '../AdCard/Adcard';
import {
  elementIsInViewport,
  sideScroll,
} from '../CategoryNavBar/CategoryNavBar';
import { usePlaylist } from './../../controllers/PlaylistProvider';
import AudioCard, { capitalizeFirstLetter } from './AudioCard';

const AudioCards = ({ cardItems, categoryName }) => {
  const audioCards = useRef();
  const { setContextPlaylist } = usePlaylist();
  const [scrollArrowHide, setScrollArrowHide] = useState(() => {
    try {
      // console.log(window.screen.width);
      if (window.screen.width && window.screen.width > 769) {
        if (cardItems.length < 4) {
          return {
            left: true,
            right: true,
          };
        }
        return {
          left: true,
          right: false,
        };
      } else {
        return {
          left: true,
          right: true,
        };
      }
    } catch {
      return {
        left: true,
        right: true,
      };
    }
  });

  const [origin, setOrigin] = useState();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  function checkArrowAndHide() {
    // console.log(audioCards.current);
    const firstElement = document.getElementById(
      `${categoryName}-${cardItems[0]._id}`
    );
    const lastElement = document.getElementById(
      `${categoryName}-${cardItems[cardItems.length - 1]._id}`
    );
    if (window.screen.width && window.screen.width > 769) {
      if (
        !elementIsInViewport(firstElement) &&
        !elementIsInViewport(lastElement)
      )
        setScrollArrowHide({ left: false, right: false });
      else if (elementIsInViewport(firstElement))
        setScrollArrowHide({ left: true, right: false });
      else if (elementIsInViewport(lastElement))
        setScrollArrowHide({ left: false, right: true });
    }
  }

  const scrollRight = () => {
    sideScroll(audioCards.current, 'right', 25, 325, 15);
  };
  const scrollLeft = () => {
    sideScroll(audioCards.current, 'left', 25, 325, 15);
  };

  function getMixedCards() {
    const cards = [];

    for (var i = 0, j = 1; i < cardItems.length; i++, j++) {
      if (j % 5 === 0) {
        cards.push(
          <div
            key={`google-card-${j}`}
            className="shadow-custom mx-2"
            style={{
              minWidth: '325px',
              minHeight: '205px',
              width: '325px',
              height: '205px',
            }}
            // className="audio-card mini generic-card p-0"
          >
            <Adcard />
          </div>
        );
      }

      cards.push(
        <AudioCard
          key={i}
          origin={origin}
          categoryName={categoryName}
          cardItemData={cardItems[i]}
        />
      );
    }

    return cards;
  }

  return (
    <section className="audio-cards-section">
      <div className="audio-cards-outer-container">
        <h2 className="heading">{capitalizeFirstLetter(categoryName)}</h2>
        {cardItems && cardItems.length ? (
          <div
            onClick={() => {
              setContextPlaylist(cardItems);
              // console.log('audiocards', cardItems);
            }}
            ref={audioCards}
            onScroll={checkArrowAndHide}
            className="audio-cards-container"
          >
            {!scrollArrowHide.left && (
              <button
                onClick={scrollLeft}
                className="absolute p-1 rounded-full bg-gradient-to-l from-indigo-650 to-indigo-600 mt-3 z-10 lg:-ml-8"
              >
                <MdKeyboardArrowLeft
                  fontSize="1.25rem"
                  className="text-white"
                />
              </button>
            )}
            {!scrollArrowHide.right && (
              <button
                onClick={scrollRight}
                className="absolute text-white p-1 rounded-full bg-gradient-to-l from-indigo-650 to-indigo-600 mt-3 right-0 z-10 lg:-mr-8"
              >
                <MdKeyboardArrowRight
                  fontSize="1.25rem"
                  className="text-white"
                />
              </button>
            )}
            {getMixedCards()}
          </div>
        ) : (
          <p className="flex items-center justify-center">
            <img className="h-20" src={NoResult.src} alt="no match" />
            <strong>No match found</strong>
          </p>
        )}
      </div>
    </section>
  );
};

export default AudioCards;
