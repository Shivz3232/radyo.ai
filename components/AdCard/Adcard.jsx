import React from 'react';
import { GoogleCard } from './GoogleCard';

const Adcard = () => {
  return (
    <div
      style={{
        minWidth: '325px',
        minHeight: '205px',
        width: 'min-content',
        height: '205px',
      }}
    >
      <GoogleCard size="320x200" />
      {/* <img src="https://via.placeholder.com/320x200" alt="placeholder" /> */}
    </div>
  );
};

export default Adcard;
