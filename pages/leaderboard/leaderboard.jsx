import React, { useEffect } from 'react';
//import BarChartRace from "../../components/Leaderboard/BarChartRace";
import loadable from '@loadable/component';
import { initGA, trackPageView } from '../../components/Tracking/tracking';

const BarChartRace1 = loadable(() =>
  import('../../components/Leaderboard/LeaderBoard')
);

// browser code
const Leaderboard = () => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  return (
    <>
      <div className="lb-box-container">
        <BarChartRace1 />
      </div>
    </>
  );
};

export default Leaderboard;
