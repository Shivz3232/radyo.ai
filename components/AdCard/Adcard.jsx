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
        // minHeight: '205px',
        border: '1px red solid',
        width: '325px',
        height: '205px',
      }}
    >
      <AdSense.Google
        client={GAD_CLIENT_ID}
        slot={GAD_SLOT}
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
        // layoutKey={GAD_LAYOUT_KEY}
      />
    </div>
  );
};

export default Adcard;
