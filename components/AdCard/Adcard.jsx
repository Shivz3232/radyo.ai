import React from 'react';
import { GoogleCard } from './GoogleCard';

const Adcard = () => {
  return (
    <div
      style={{
        minWidth: '320px',
        minHeight: '200px',
        width: '320px',
        height: '200px',
      }}
    >
      {/* <GoogleCard size="320x200" /> */}
      <img src="https://via.placeholder.com/320x200" alt="placeholder" />
    </div>
  );
};

export default Adcard;
