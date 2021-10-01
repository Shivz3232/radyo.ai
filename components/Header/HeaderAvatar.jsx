import avatar from '../../assets/Avatar.png';
import React from 'react';
import { RiArrowDropDownFill } from 'react-icons/ri';

const HeaderAvatar = ({ data }) => {
  return (
    <div className="flex flex-row items-center  cursor-pointer">
      <img
        src={data.avatarImage ? data.avatarImage : avatar.src}
        alt="avatar"
        className="h-12 w-12 rounded-full bg-gray-200 align-middle"
      />
      <div className="w-4 align-middle">
        <RiArrowDropDownFill fontSize="2.5rem" className="-mx-3" />
      </div>
    </div>
  );
};

export default HeaderAvatar;
