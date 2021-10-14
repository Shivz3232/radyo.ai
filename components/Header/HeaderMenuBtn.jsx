import Link from 'next/link';
import React from 'react';

const HeaderMenuBtn = ({ data, activeTab }) => {
  return (
    <div
      className={`text-lg font-medium text-indigo-650 hover:transform hover:scale-120 transition ease-in-out delay-75 ${
        activeTab === data.id ? 'scale-120' : ''
      }`}
    >
      <Link href={data.url}>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>{data.label}</a>
      </Link>
    </div>
  );
};

export default HeaderMenuBtn;
