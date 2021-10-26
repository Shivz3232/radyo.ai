import { DFPSlotsProvider, AdSlot } from 'react-dfp';
import React from 'react';

const GooglePusblisherAd = () => {
  return (
    <DFPSlotsProvider dfpNetworkId="22624757209">
      <AdSlot adUnit="/22624757209/playeradmanagercode" sizes={[[970, 90]]} />
    </DFPSlotsProvider>
  );
};

export default GooglePusblisherAd;
