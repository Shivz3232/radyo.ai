import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import {
  elementIsInViewport,
  sideScroll,
} from '../CategoryNavBar/CategoryNavBar';
import AudioCard, { capitalizeFirstLetter } from './AudioCard';
import { usePlaylist } from './../../controllers/PlaylistProvider';

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
                className="absolute p-1 rounded-full bg-indigo-650 opacity-80 mt-3 z-10 lg:-ml-8"
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
                className="absolute text-white p-1 rounded-full bg-indigo-650 opacity-80 mt-3 right-0 z-10 lg:-mr-8"
              >
                <MdKeyboardArrowRight
                  fontSize="1.25rem"
                  className="text-white"
                />
              </button>
            )}
            {cardItems.map(cardItemData => {
              return (
                <AudioCard
                  categoryName={categoryName}
                  key={cardItemData._id}
                  cardItemData={cardItemData}
                />
              );
            })}
          </div>
        ) : (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <strong>No match found</strong>
          </p>
        )}
      </div>
    </section>
  );
};

export default AudioCards;
