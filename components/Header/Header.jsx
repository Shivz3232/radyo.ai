import React from 'react';
import HeaderBrand from './HeaderBrand';
import HeaderMenu from './HeaderMenu';
import HamburgerMenu from './HamburgerMenu';
import AddAudioBtn from './AddAudioBtn';
import UserMenu from './UserMenu';
import { useAuth } from '../../controllers/auth';
import { usePlaylist } from './../../controllers/PlaylistProvider';

function Header({ activeTab, data, hideFlag }) {
  const { userid } = useAuth();
  const { isPlaying } = usePlaylist();
  return (
    <>
      <div
        className={`${
          hideFlag ? 'hidden' : ''
        } z-20 bg-white shadow-md flex w-full flex-row  items-center sticky top-0 px-4 py-2`}
      >
        <HeaderBrand />
        <HeaderMenu activeTab={activeTab} data={data} />
        <div className="md:hidden flex flex-1 justify-end items-center">
          {userid ? <UserMenu data={data} /> : null}
          <HamburgerMenu loggedIn={userid ? true : false} />
        </div>
      </div>
      <div
        className={`md:hidden fixed ${
          isPlaying ? 'bottom-24' : 'bottom-5'
        } right-4 z-30`}
      >
        <AddAudioBtn iconSize="h-12" customStyles="shadow-md" hideText={true} />
      </div>
    </>
  );
}
export default Header;
