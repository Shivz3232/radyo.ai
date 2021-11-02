import React from 'react';
import AdSense from 'react-adsense';
import {
  GAD_CLIENT_ID,
  // GAD_LAYOUT_KEY,
  GAD_SLOT,
} from './../../constants';

const Adcard = () => {
  return (
    <div
      style={{
        // minWidth: '325px',
        maxHeight: '180px',
        // border: '1px red solid',
        width: '300px',
        height: '180px',
      }}
    >
      <AdSense.Google
        client={GAD_CLIENT_ID}
        slot={GAD_SLOT}
        style={{ display: 'inline-block', width: '100%', height: '100%' }}
        format=""
        // responsive="true"
        // layoutKey={GAD_LAYOUT_KEY}
      />
    </div>
  );
};

export default Adcard;
