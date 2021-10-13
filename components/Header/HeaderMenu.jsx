import React, { useState, useEffect } from 'react';
import AddAudioBtn from './AddAudioBtn';
import HeaderLoginBtn from './HeaderLoginBtn';
import HeaderMenuBtn from './HeaderMenuBtn';
import { menuLinks } from './menuData';

const HeaderMenu = ({ activeTab, data }) => {
  return (
    <div className="md:flex flex-row flex-1 items-center hidden">
      <div className="flex-1 flex flex-row justify-evenly">
        {menuLinks.map((e, i) => {
          return <HeaderMenuBtn activeTab={activeTab} key={i} data={e} />;
        })}
      </div>
      <AddAudioBtn customStyles="mx-3"  />
      <HeaderLoginBtn data={data} />
    </div>
  );
};

export default HeaderMenu;
