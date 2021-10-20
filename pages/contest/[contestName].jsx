import dynamic from 'next/dynamic';
import React from 'react';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import { getContestDetails, getContestIds } from '../../controllers/contest';
import dbConnect from '../../utils/dbConnect';
import Banner1 from '../../assets/Banner_Radyo.svg';
import Banner2 from '../../assets/Banner_English_artist.svg';
import Banner3 from '../../assets/Banner_English_Listener.svg';
import Banner4 from '../../assets/Banner_Hindi_artist.svg';
const BarChartRace = dynamic(
  () => import('./../../components/Leaderboard/LeaderBoard'),
  { ssr: false, loading: () => <p>loading...</p> }
);

const ContestPage = ({ contest }) => {
  //   console.log('details:', contest);
  const images = [Banner1.src, Banner2.src, Banner3.src, Banner4.src];

  return (
    <div className="container">
      <ContestNavBar />
      <div className="flex justify-center">
        <HomeCarousel images={images} />
      </div>
      <div>{contest.name}</div>
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
            <BarChartRace contestId={contest._id} />
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
            className={`rounded-b-md text-base text-left py-1 px-2 border border-t-0 border-indigo-650 `}
          >
            <p className="my-3">
              <strong>How to participate : </strong>
              {contest.how_to_participate}
            </p>

            <p className="my-3">
              <strong>Contest start date :</strong>{' '}
              {new Date(contest.startDate).toDateString()}
            </p>
            <p className="my-3">
              <strong>Contest end date :</strong>{' '}
              {new Date(contest.endDate).toDateString()}
            </p>
            <p className="my-3">
              <strong>Prizes to win :</strong> {contest.prizes_to_win}
            </p>
            <p className="my-3">
              <strong>Terms and conditions :</strong>{' '}
              {contest.terms_and_conditions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  await dbConnect();
  const url_name = params.contestName;
  //   console.log('params:', params);
  const contest = await getContestDetails(url_name).catch(console.error);
  if (contest) {
    return {
      props: {
        contest: contest,
        activeTab: 'contest',
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export async function getStaticPaths() {
  await dbConnect();
  const contests = await getContestIds().catch(console.error);

  if (contests) {
    let paths = contests.map(elem => {
      return {
        params: { contestName: elem.path.toString() },
      };
    });
    // console.log('paths:', paths);
    return {
      paths: paths,
      fallback: 'blocking',
    };
  } else {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export default ContestPage;
