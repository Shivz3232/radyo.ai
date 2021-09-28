import Link from 'next/link';
import React, { useState } from 'react';

const userNavbar = () => {
  return (
    <div>
      <div className="text-indigo-600 flex flex-row justify-center mt-7 text-lg sm:text-2xl  space-x-4 sm:space-x-9">
        <Link href="/user/myProfile">
          <a className="bg-indigo-300 p-4 rounded-md" style={{ textDecoration: 'none', color: 'inherit' }}>My Profile</a>
        </Link>
        <Link href="/user/addAudio">
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            Add an Audio
          </a>
        </Link>
        <Link href="/user/mySubmissions">
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            My Submission
          </a>
        </Link>
      </div>
    </div>
  );
};

export default userNavbar;
