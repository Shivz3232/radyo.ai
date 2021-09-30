import React, { useEffect, useRef } from 'react';
import { categoryDataLinks } from './categoryData';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Link from 'next/link';

const CategoryNavBar = ({ category }) => {
  const navBarRef = useRef();
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
      // sideScroll(navBarRef.current, 'right', 25, scrollDistance, 25)
    }
  }, [category]);
  const scrollRight = () => {
    // console.log(navBarRef.current);
    sideScroll(navBarRef.current, 'right', 25, 100, 10);
  };
  const scrollLeft = () => {
    sideScroll(navBarRef.current, 'left', 25, 100, 10);
  };
  return (
    <>
      <button
        onClick={scrollLeft}
        className="absolute p-1 rounded-full bg-indigo-650 mt-4 z-10 ml-4"
      >
        <MdKeyboardArrowLeft fontSize="1.5rem" className="text-white" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute text-white p-1 rounded-full bg-indigo-650 mr-4 mt-4 right-0 z-10"
      >
        <MdKeyboardArrowRight fontSize="1.5rem" className="text-white" />
      </button>
      <div className="category-navbar container max-w-screen">
        <div
          ref={navBarRef}
          className="no-scrollbar  mx-1 p-2 pt-0 z-10 whitespace-nowrap overflow-y-hidden  overflow-x-scroll"
        >
          {categoryDataLinks.map((data, i) => {
            return (
              <button
                key={i}
                id={data.id}
                className={` min-w-44 mx-2 rounded-md border border-indigo-650 px-2 py-1 ${
                  data.id === category
                    ? 'text-white bg-indigo-650'
                    : 'text-indigo-650 hover:bg-gray-100'
                }`}
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

function sideScroll(element, direction, speed, distance, step) {
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
function isInViewport(element) {
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

export default CategoryNavBar;
