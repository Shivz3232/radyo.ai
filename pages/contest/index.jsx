import React, { useEffect, useState } from 'react';
import HomeCarousel from './../../components/HomeCarousel/HomeCarousel';
import loadable from '@loadable/component';
import Link from 'next/link';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import Banner1 from '../../assets/Banner_Radyo.svg';
import Banner2 from '../../assets/Banner_English_artist.svg';
import Banner3 from '../../assets/Banner_English_Listener.svg';
import Banner4 from '../../assets/Banner_Hindi_artist.svg';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import dynamic from 'next/dynamic';

// const BarChartRace1 = loadable(() =>
//   import('./../../components/Leaderboard/LeaderBoard')
// );

const BarChartRace1 = dynamic(
  () => import('./../../components/Leaderboard/LeaderBoard'),
  { ssr: false, loading: () => <p>loading...</p> }
);

const Contest = () => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  const images = [Banner1.src, Banner2.src, Banner3.src, Banner4.src];
  return (
    <div className="container">
      <ContestNavBar selectedTab="month" />
      <div className="flex justify-center">
        <HomeCarousel images={images} />
      </div>
      <div
        className={`w-full mobile:w-11/12 mx-auto text-center flex flex-row-reverse mobile:block ipad:block rounded-md items-center mt-1 sm:mt-8 sm:text-xs`}
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
            Contest Rules and Regulations
          </div>
          <div
            className={`h-96 rounded-b-md text-base text-left py-1 px-2 border border-t-0 border-indigo-650 `}
          >
            <p className="my-3">
              <strong>How to participate :</strong> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Commodi excepturi reprehenderit
              illum placeat ullam, labore iusto maxime libero unde aliquid velit
              laborum at omnis vitae asperiores amet iure ipsam eius!
            </p>

            <p className="my-3">
              <strong>Contest date :</strong> 07 november 2021
            </p>
            <p className="my-3">
              <strong>Prizes to win :</strong> cash prize lorem ipsum dolor sit
              amet consectetur adipisicing elit. Commodi ex
            </p>
            <p className="my-3">
              <strong>Terms and conditions :</strong> Lorem ipsum dolor, sit
              amet consectetur adipisicing elit. Eum quo ad dolorem at illo
              dolor quod quisquam porro. Fuga maiores dolor nisi dolore. Quasi
              nisi, id inventore dolore illum expedita!
            </p>
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
