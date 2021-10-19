import React, { useState } from 'react';
import Link from 'next/link';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabStyles =
  'w-full py-2.5 text-sm text-center leading-5 font-medium text-blue-700 rounded-lg';
const hoverStyles =
  'text-blue-100 hover:bg-white/[0.12] hover:text-white transition';

const ContestNavBar = ({ selectedTab }) => {
  const links = [
    { id: 'month', label: 'Voice of the month', url: '/contest' },
    {
      id: 'year',
      label: 'Voice of the year',
      url: '/contest/voice-of-the-year',
    },
    { id: 'past', label: 'Past contest', url: '/contest/past-contest' },
  ];

  return (
    <div className="w-full">
      <div className="w-full  px-4 py-5 sm:px-0 mx-auto">
        <div className="flex p-1 space-x-1 bg-indigo-650 rounded-xl">
          {links.map((elem, i) => {
            return (
              <div
                key={i}
                className={classNames(
                  tabStyles,
                  selectedTab === elem.id
                    ? 'bg-white shadow transition'
                    : hoverStyles
                )}
              >
                <Link href={elem.url}>
                  <a className="py-2 px-2 xs:px-4 sm:px-8">{elem.label}</a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContestNavBar;
