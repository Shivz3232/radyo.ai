import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import ArtistCard from './ArtistCard';
import {
  elementIsInViewport,
  sideScroll,
} from '../CategoryNavBar/CategoryNavBar';

const TrendingArtist = ({ heading, data }) => {
  // console.log(data);
  const horizontalSection = useRef();
  const [scrollArrowHide, setScrollArrowHide] = useState(() => {
    try {
      // console.log(window.screen.width);
      if (window.screen.width && window.screen.width > 769) {
        if (data.length < 7) {
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
    const firstElement = document.getElementById(`artist-${data[0]._id}`);
    const lastElement = document.getElementById(
      `artist-${data[data.length - 1]._id}`
    );
    // console.log(firstElement,lastElement);
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
    sideScroll(horizontalSection.current, 'right', 25, 325, 15);
  };
  const scrollLeft = () => {
    sideScroll(horizontalSection.current, 'left', 25, 325, 15);
  };
  return (
    <div className="mb-6">
      <div className="">
        <div className="m-0 text-indigo-650 w-4/5 text-2xl mobile:text-xl mobile:ml-4">
          {heading}
        </div>
        <div
          ref={horizontalSection}
          onScroll={checkArrowAndHide}
          className="no-scrollbar p-4 max-w-full flex overflow-x-scroll overflow-y-hidden"
        >
          {!scrollArrowHide.left && (
            <button
              onClick={scrollLeft}
              className="absolute p-1 rounded-full bg-indigo-650 opacity-80 mt-8 z-10 lg:-ml-8"
            >
              <MdKeyboardArrowLeft fontSize="1.25rem" className="text-white" />
            </button>
          )}
          {!scrollArrowHide.right && (
            <button
              onClick={scrollRight}
              className="absolute text-white p-1 rounded-full bg-indigo-650 opacity-80 mt-8 right-0 z-10 lg:-mr-8"
            >
              <MdKeyboardArrowRight fontSize="1.25rem" className="text-white" />
            </button>
          )}
          {data.map((elem, i) => {
            return (
              <ArtistCard
                id={`artist-${elem._id}`}
                uid={elem.uid}
                name={elem.creatorName}
                avatar={elem.avatarImage}
                key={i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingArtist;
