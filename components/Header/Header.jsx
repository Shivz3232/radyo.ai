import React from 'react';
import HeaderBrand from './HeaderBrand';
import HeaderMenu from './HeaderMenu';
import HamburgerMenu from './HamburgerMenu';
import AddAudioBtn from './AddAudioBtn';
import UserMenu from './UserMenu';

function Header({ activeTab, data }) {
  return (
    <>
      <div className="z-20 bg-white shadow-md flex w-full flex-row  items-center sticky top-0 px-4 py-2">
        <HeaderBrand />
        <HeaderMenu activeTab={activeTab} data={data} />
        <div className="md:hidden flex flex-1 justify-end items-center">
          {data.loggedIn && <UserMenu data={data} />}
          <HamburgerMenu loggedIn={data.loggedIn} />
        </div>
      </div>
      <div className="md:hidden fixed bottom-5 right-4 z-30">
        <AddAudioBtn size="L" customStyles="shadow-md" />
      </div>
    </>
  );
}
export default Header;
