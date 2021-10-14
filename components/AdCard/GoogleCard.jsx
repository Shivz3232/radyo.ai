import React, { useState } from 'react';
import AdSense from 'react-adsense';
import {
  GAD_CLIENT_ID,
  GAD_LAYOUT_KEY,
  GAD_SLOT,
  GAD_SLOT_SIZE,
} from './../../constants';

export const GoogleCard = props => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.size && props.size !== 'RESPONSIVE' ? (
        <AdSense.Google
          client={GAD_CLIENT_ID}
          slot={props.size ? GAD_SLOT_SIZE[props.size] : GAD_SLOT}
          style={{
            display: 'inline-block',
            width: '100%',
            height: '100%',
          }}
          layout="in-article"
          format=""
        />
      ) : (
        <AdSense.Google
          client={GAD_CLIENT_ID}
          slot={GAD_SLOT_SIZE.RESPONSIVE}
          style={{ display: 'block' }}
          format="fluid"
          // responsive="true"
          layout="in-article"
          layoutKey={GAD_LAYOUT_KEY}
        />
      )}
    </div>
  );
};
