import React from 'react';
import { GoogleCard } from './GoogleCard';

const Adcard = () => {
  return (
    <div
      style={{
        minWidth: '320px',
        width: '320px',
        height: '200px',
      }}
    >
      <GoogleCard size="320x200" />
    </div>
  );
};

export default Adcard;
