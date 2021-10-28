import React from 'react';
import HeaderAvatar from './HeaderAvatar';
import UserMenu from './UserMenu';
import { useAuth } from '../../controllers/auth';
import Link from 'next/link';

const HeaderLoginBtn = ({ data }) => {
  const { userid } = useAuth();
  return userid ? (
    <UserMenu data={data} />
  ) : (
    <Link href="/login" passHref>
      <button className="rounded px-4 py-2 bg-gradient-to-l from-indigo-650 to-indigo-600 text-white hover:text-indigo-100 hover:shadow-xl transition delay-75 ease-in-out cursor-pointer">
        Login / SignUp
      </button>
    </Link>
  );
};

export default HeaderLoginBtn;
