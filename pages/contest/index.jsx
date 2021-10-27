import React, { useEffect } from 'react';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import Router from 'next/router';
import dbConnect from './../../utils/dbConnect';
import { getLatestContest } from '../../controllers/contest';

const Contest = ({ month_url, year_url }) => {
  useEffect(() => {
    //redirect
    Router.push(`/contest/${month_url}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <ContestNavBar month_url={'#'} year_url={'#'} />
      <div className=" flex justify-center items-center z-40">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    </div>
  );
};
export async function getStaticProps() {
  await dbConnect();
  const result = await getLatestContest().catch(console.error);
  if (result) {
    const month_url = result.find(elem => {
      return elem.active && elem.contest_type === 'month';
    });
    const year_url = result.find(elem => {
      return elem.active && elem.contest_type === 'year';
    });
    return {
      props: {
        month_url: month_url ? month_url.url_name : '#',
        year_url: year_url ? year_url.url_name : '#',
        activeTab: 'contest',
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {
        activeTab: 'contest',
      },
    };
  }
}
export default Contest;
