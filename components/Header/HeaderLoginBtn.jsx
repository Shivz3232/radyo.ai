import React from 'react';
import HeaderAvatar from './HeaderAvatar';
import UserMenu from './UserMenu';
import { useAuth } from '../../controllers/auth';
import Link from 'next/link';

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
      <Link href="/login">
        <a style={{ textDecoration: 'none', color: 'inherit' }}>
          Login / SignUp
        </a>
      </Link>
    </div>
  );
};

export default HeaderLoginBtn;
