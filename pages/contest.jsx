import React, { useEffect, useState } from 'react';
import HomeCarousel from './../components/HomeCarousel/HomeCarousel';
import loadable from '@loadable/component';
import Link from 'next/link';
import { initGA, trackPageView } from '../components/Tracking/tracking';
import Banner1 from '../assets/Banner_Radyo.svg';
import Banner2 from '../assets/Banner_English_artist.svg';
import Banner3 from '../assets/Banner_English_Listener.svg';
import Banner4 from '../assets/Banner_Hindi_artist.svg';
const BarChartRace1 = loadable(() =>
  import('./../components/Leaderboard/LeaderBoard')
);
const Contest = () => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  const [isClicked, setIsClicked] = useState(false);
  const images = [Banner1.src, Banner2.src, Banner3.src, Banner4.src];
  return (
    <div className="container">
      <div className={`flex flex-row sm:my-4`}>
        {['Contest 1', 'Contest 2', 'Jackpot', 'Past contest'].map(
          (elem, i) => {
            return (
              <button
                key={i}
                className={` w-60 mx-2 rounded-md border border-indigo-650 px-2 py-2 text-white bg-indigo-650 md:mt-8 sm:wd-20`}
                onClicked={() => setIsClicked(true)}
              >
                <Link href="#">
                  <a>{elem}</a>
                </Link>
              </button>
            );
          }
        )}
      </div>

      <div className="flex justify-center md:mt-8">
        <HomeCarousel images={images} />
      </div>

      <div
        className={`w-full text-center flex flex-row-reverse mobile:block ipad:block rounded-md items-center mt-2 sm:mt-8 sm:text-xs`}
      >
        <div className={`w-1/2 mobile:w-full ipad:w-full flex-row my-4 mx-1 `}>
          <div
            className={`text-white bg-indigo-650 rounded-t-md py-1 h-18 sm:text-sm max-w-1/2`}
          >
            Live Leaderboard
          </div>
          <div
            className={`text-indigo-650 w-full h-96  mobile:h-full rounded-b-md p-1 border border-t-0 border-indigo-650 overflow-hidden`}
          >
            <BarChartRace1 />
          </div>
        </div>
        <div
          className={`w-1/2 mobile:w-full ipad:w-full flex-row mx-1  rounded-md  `}
        >
          <div
            className={`text-white bg-indigo-650 rounded-t-md py-1 h-18 sm:text-sm max-w-1/2`}
          >
            Contest 1 Rules and Regulations
          </div>
          <div
            className={`text-indigo-650 h-96 rounded-b-md border border-t-0  border-indigo-650`}
          >
            <div>Rules will be here</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getStaticProps() {
  return {
    props: {
      activeTab: 'contest',
    },
  };
}
export default Contest;
