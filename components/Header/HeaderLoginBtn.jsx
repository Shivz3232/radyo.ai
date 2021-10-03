import React from 'react';
import HeaderAvatar from './HeaderAvatar';
import UserMenu from './UserMenu';
import { useAuth } from '../../controllers/auth';

const HeaderLoginBtn = ({ data }) => {
  const { userid } = useAuth();
  function handleClick() {}
  return userid ? (
    <UserMenu data={data} />
  ) : (
    <div
      onClick={handleClick}
      className="border border-indigo-650 rounded px-4 py-2 bg-indigo-650 text-white hover:bg-white hover:text-indigo-650 transition delay-75 ease-in-out cursor-pointer"
    >
    <a href="/login">Login / SignUp</a>
    </div>
  );
};

export default HeaderLoginBtn;
