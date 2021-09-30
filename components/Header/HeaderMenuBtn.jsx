import { Router } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const HeaderMenuBtn = ({ data, activeTab }) => {
  return (
    <div
      className={`text-lg font-medium text-indigo-650 hover:transform hover:scale-120 transition ease-in-out delay-75 ${
        activeTab === data.url ? 'scale-120' : ''
      }`}
    >
      <Link href={data.url}>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>{data.label}</a>
      </Link>
    </div>
  );
};

export default HeaderMenuBtn;
