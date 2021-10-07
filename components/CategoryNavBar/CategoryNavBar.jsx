import React, { useEffect, useRef, useState } from 'react';
import { categoryDataLinks } from './categoryData';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Link from 'next/link';

const CategoryNavBar = ({ category }) => {
  const navBarRef = useRef();
  const [scrollArrowHide, setScrollArrowHide] = useState({
    left: true,
    right: false,
  });
  function checkArrowAndHide() {
    const firstElement = navBarRef.current.querySelector(
      `#${categoryDataLinks[0].id}`
    );
    const lastElement = navBarRef.current.querySelector(
      `#${categoryDataLinks[categoryDataLinks.length - 1].id}`
    );
    if (
      !elementIsInViewport(firstElement) &&
      !elementIsInViewport(lastElement)
    ) {
      setScrollArrowHide({ left: false, right: false });
      return;
    } else if (elementIsInViewport(firstElement)) {
      setScrollArrowHide({ left: true, right: false });
      return;
    } else if (elementIsInViewport(lastElement)) {
      setScrollArrowHide({ left: false, right: true });
      return;
    }
    if (elementIsInViewport(firstElement) && elementIsInViewport(lastElement))
      setScrollArrowHide({ left: false, right: false });
  }
  useEffect(() => {
    const selectedPill = categoryDataLinks.find(item => item.id === category);
    if (!selectedPill) return;
    const selectedPillElem = navBarRef.current.querySelector(
      `#${selectedPill.id}`
    );
    if (!selectedPillElem) return;
    if (!isInViewport(selectedPillElem)) {
      const scrollDistance =
        selectedPillElem.getBoundingClientRect().left -
        navBarRef.current.getBoundingClientRect().left -
        100;
      navBarRef.current.scrollLeft += scrollDistance;
    }
  }, [category]);

  const scrollRight = () => {
    sideScroll(navBarRef.current, 'right', 25, 210, 15);
  };
  const scrollLeft = () => {
    sideScroll(navBarRef.current, 'left', 25, 210, 15);
  };
  return (
    <>
      <div className="category-navbar container max-w-screen">
        {!scrollArrowHide.left && (
          <button
            onClick={scrollLeft}
            className="absolute p-1 rounded-full bg-indigo-650 opacity-80 mt-3 z-10 lg:-ml-8"
          >
            <MdKeyboardArrowLeft fontSize="1.25rem" className="text-white" />
          </button>
        )}
        {!scrollArrowHide.right && (
          <button
            onClick={scrollRight}
            className="absolute text-white p-1 rounded-full bg-indigo-650 opacity-80 mt-3 right-0 z-10 lg:-mr-8"
          >
            <MdKeyboardArrowRight fontSize="1.25rem" className="text-white" />
          </button>
        )}
        <div
          ref={navBarRef}
          onScroll={checkArrowAndHide}
          className="no-scrollbar mx-1 py-2 z-10 whitespace-nowrap overflow-y-hidden  overflow-x-scroll"
        >
          {categoryDataLinks.map((data, i) => {
            return (
              <button
                key={i}
                id={data.id}
                className={`mx-2 rounded-md border border-indigo-650 px-2 py-1 ${
                  data.id === category
                    ? 'text-white bg-indigo-650'
                    : 'text-indigo-650 hover:bg-gray-100'
                }
                ${data.id === 'all' ? 'w-20' : null}
                `}
              >
                <Link href={data.url}>
                  <a>{data.label}</a>
                </Link>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export function sideScroll(element, direction, speed, distance, step) {
  let scrollAmount = 0;
  let slideTimer = setInterval(function () {
    if (direction === 'left') {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}
export function isInViewport(element) {
  const bounding = element.getBoundingClientRect();
  return (
    // Added an offset of 100
    bounding.top >= 100 &&
    bounding.left >= 100 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}
export function elementIsInViewport(element) {
  const bounding = element.getBoundingClientRect();
  return (
    // Added an offset of 100
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

export default CategoryNavBar;
