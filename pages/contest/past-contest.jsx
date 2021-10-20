import React from 'react';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import Link from 'next/link';
import micBG from '../../assets/micBG.jpeg';
import dbConnect from './../../utils/dbConnect';
import { getAllContest } from './../../controllers/contest';

function PastContest({ allContest }) {
  const cover = micBG.src;
  return (
    <div className="container">
      <ContestNavBar selectedTab="past" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allContest.map((elem, i) => {
          return (
            <div
              key={i}
              className="w-full h-44 flex items-center justify-center"
            >
              <Link href={`/contest/${elem.url_name}`}>
                <a
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    width: '90%',
                    height: '80%',
                    margin: 'auto',
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url(${cover})`,
                      backgroundSize: 'cover',
                    }}
                    className="cursor-pointer relative hover:scale-105 delay-75 transition text-white text-xl font-bold h-full w-full rounded-md flex items-center justify-center"
                  >
                    <div className="w-4/5 bg-gray-600 bg-opacity-70 p-2 rounded">
                      {elem.name}
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await dbConnect();
  const allContest = await getAllContest().catch(console.error);
  if (allContest) {
    return {
      props: { allContest: allContest, activeTab: 'contest' },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default PastContest;
