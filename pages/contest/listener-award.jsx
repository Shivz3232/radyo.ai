import React, { useEffect } from 'react';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel';
import Banner1 from '../../assets/Banner_Radyo.svg';
import Banner2 from '../../assets/Banner_English_artist.jpg';
import Banner3 from '../../assets/Banner_English_Listener.jpg';
import Banner4 from '../../assets/Banner_Hindi_artist.jpg';
import contestRules from '../../contestRules.json';
import dbConnect from '../../utils/dbConnect';
import { getContestDetails, getLatestContest } from '../../controllers/contest';
import { initGA, trackPageView } from './../../components/Tracking/tracking';

const Listener = ({ month_url, year_url, contest }) => {
  const images = [
    { img: Banner1.src, url: '/' },
    { img: Banner2.src, url: '/contest' },
    { img: Banner3.src, url: '/contest' },
    { img: Banner4.src, url: '/contest' },
  ];
  function createMarkup(data) {
    return {
      __html: data,
    };
  }

  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

  return (
    <div className="container">
      <ContestNavBar
        selectedTab="listener"
        month_url={month_url}
        year_url={year_url}
      />
      <div className="flex justify-center">
        <HomeCarousel images={images} />
      </div>
      <div
        className={`w-full mobile:w-11/12 mx-auto text-center   mobile:block ipad:block rounded-md items-center mt-1 sm:mt-8 sm:text-xs`}
      >
        <div className={`w-full flex-row mx-1 my-2 rounded-md  `}>
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
        <div className={`w-full flex-row mx-1 `}>
          <div
            className={`text-white bg-indigo-650 rounded-t-md py-1 h-18 sm:text-sm max-w-1/2`}
          >
            Winners
          </div>
          <div
            className={`text-indigo-650 w-full   mobile:h-full rounded-b-md p-1 border border-t-0 border-indigo-650 overflow-hidden`}
          >
            {contest && contest.contest_results && (
              <div className="w-full p-2">
                <div className="flex border-b-2 border-indigo-650 text-lg mobile:text-base text-left">
                  <div className="w-1/5 mobile:w-1/4  mr-2">Date</div>
                  <div className="w-4/5 mobile:w-3/4 ml-2">List</div>
                </div>
                {contest.contest_results.reverse().map((elem, i) => {
                  return (
                    <div
                      key={i}
                      className="flex text-lg text-left p-1 border-b mobile:text-base"
                    >
                      <div className="w-1/5 mobile:w-1/4 mr-3">
                        {new Date(elem.date).toLocaleDateString()}
                      </div>
                      <div className="w-4/5 mobile:w-3/4 ml-2">
                        {elem.result.map(e => e.creatorName).join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listener;

export async function getStaticProps() {
  await dbConnect();
  const url_name = 'listener-award';
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
        month_url: month_url ? month_url.url_name : '#',
        year_url: year_url ? year_url.url_name : '#',
        contest: contest,
        activeTab: 'contest',
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {},
    };
  }
}
