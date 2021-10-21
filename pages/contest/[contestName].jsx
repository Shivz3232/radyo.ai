import dynamic from 'next/dynamic';
import React from 'react';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import {
  getContestDetails,
  getContestIds,
  getLatestContest,
} from '../../controllers/contest';
import dbConnect from '../../utils/dbConnect';
import Banner1 from '../../assets/Banner_Radyo.svg';
import Banner2 from '../../assets/Banner_English_artist.svg';
import Banner3 from '../../assets/Banner_English_Listener.svg';
import Banner4 from '../../assets/Banner_Hindi_artist.svg';
import contestRules from '../../contestRules.json';
import WinnersList from '../../components/Contest/WinnersList';
const BarChartRace = dynamic(
  () => import('./../../components/Leaderboard/LeaderBoard'),
  { ssr: false, loading: () => <p>loading...</p> }
);

const ContestPage = ({ month_url, year_url, contest }) => {
  const images = [Banner1.src, Banner2.src, Banner3.src, Banner4.src];

  function createMarkup(data) {
    return {
      __html: data,
    };
  }

  return (
    <div className="container">
      <ContestNavBar
        selectedTab={
          contest.url_name === month_url
            ? 'month'
            : contest.url_name === year_url
            ? 'year'
            : false
        }
        month_url={month_url}
        year_url={year_url}
      />
      {contest.active && (
        <div className="flex justify-center">
          <HomeCarousel images={images} />
        </div>
      )}
      <div className="text-2xl mobile:text-xl text-indigo-650 text-center">
        {contest.name}
      </div>
      {/* winnners list when not active */}
      {/* <div className="text-xl text-indigo-650 text-center">
        Winner : {contest.name}
      </div> */}
      <div
        className={`w-full mobile:w-11/12 mx-auto text-center flex flex-row-reverse mobile:block ipad:block rounded-md items-center mt-1 sm:mt-8 sm:text-xs`}
      >
        {contest.active && (
          <div
            className={`w-1/2 mobile:w-full ipad:w-full flex-row my-4 mx-1 `}
          >
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
        )}
        {!contest.active && (
          <div
            className={`w-1/2 mobile:w-full ipad:w-full flex-row my-4 mx-1 `}
          >
            <div
              className={`text-white bg-indigo-650 rounded-t-md py-1 h-18 sm:text-sm max-w-1/2`}
            >
              Leaderboard
            </div>
            <div
              className={`text-indigo-650 w-full   mobile:h-full rounded-b-md p-1 border border-t-0 border-indigo-650 overflow-hidden`}
            >
              {contest && contest.contest_results && (
                <WinnersList contest_results={contest.contest_results} />
              )}
            </div>
          </div>
        )}
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
              <strong>How to participate : </strong>{' '}
              <div
                className=" inline"
                dangerouslySetInnerHTML={createMarkup(
                  contest.how_to_participate
                    ? contest.how_to_participate
                    : contestRules.how_to_participate
                )}
              ></div>
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
              <strong>Prizes to win :</strong>{' '}
              <div
                className="inline"
                dangerouslySetInnerHTML={createMarkup(
                  contest.prizes_to_win
                    ? contest.prizes_to_win
                    : contestRules.prizes_to_win
                )}
              ></div>
            </p>
            <p className="my-3">
              <strong>Terms and conditions :</strong>{' '}
              <div
                className="inline"
                dangerouslySetInnerHTML={createMarkup(
                  contest.terms_and_conditions
                    ? contest.terms_and_conditions
                    : contestRules.terms_and_conditions
                )}
              ></div>
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
  const result = await getLatestContest().catch(console.error);

  if (contest && result) {
    // console.log(result);
    const month_url = result.find(elem => {
      return elem.active && elem.contest_type === 'month';
    });
    const year_url = result.find(elem => {
      return elem.active && elem.contest_type === 'year';
    });
    // console.log(month_url, year_url);
    return {
      props: {
        month_url: month_url.url_name,
        year_url: year_url.url_name,
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
