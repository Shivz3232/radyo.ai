import React, { useState } from 'react';
import { userMenuLinks } from '../Header/menuData';
import Link from 'next/link';

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const tabStyles =
  'w-full py-2.5 text-sm text-center leading-5 font-medium text-blue-700 rounded-lg';
const hoverStyles =
  'text-blue-100 hover:bg-white/[0.12] hover:text-white transition';

const UserNavbar = ({ selectedTab }) => {
  const [selected, setSelected] = useState(selectedTab);

  return (
    <div>
      <div className="w-1/2 px-4 py-5 sm:px-0 mx-auto">
        <div className="flex p-1 space-x-1 bg-indigo-650 rounded-xl ">
          <div
            className={classNames(
              tabStyles,
              selected.profile ? 'bg-white shadow transition' : hoverStyles
            )}
          >
            <Link href={userMenuLinks[0].url}>
              <a className="py-2 px-2">{userMenuLinks[0].label}</a>
            </Link>
          </div>

          <div
            className={classNames(
              tabStyles,
              selected.addAudio ? 'bg-white shadow transition' : hoverStyles
            )}
          >
            <Link href={userMenuLinks[1].url}>
              <a className="py-2 px-2">{userMenuLinks[1].label}</a>
            </Link>
          </div>

          <div
            className={classNames(
              tabStyles,
              selected.mySubmission ? 'bg-white shadow transition' : hoverStyles
            )}
          >
            <Link href={userMenuLinks[2].url}>
              <a className="py-2 px-2">{userMenuLinks[2].label}</a>
            </Link>
          </div>
          {/* Turning off playlist in production
          <div
            className={classNames(
              tabStyles,
              selected.myPlaylists ? 'bg-white shadow transition' : hoverStyles
            )}
          >
            <Link href={userMenuLinks[3].url}>
              <a className="py-2 px-2">{userMenuLinks[3].label}</a>
            </Link>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
