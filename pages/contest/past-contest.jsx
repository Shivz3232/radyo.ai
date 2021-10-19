import React from 'react';
import ContestNavBar from '../../components/Contest/ContestNavBar';
import Link from 'next/link';

function PastContest() {
  const contests = [
    {
      id: 1,
      label: 'Voice of the month',
      url: '/contest',
    },
    {
      id: 2,
      label: 'Voice of the year',
      url: '/contest/voice-of-the-year',
    },
    {
      id: 3,
      label: 'Contest A',
      url: '#',
    },
    {
      id: 4,
      label: 'Contest B',
      url: '#',
    },
    {
      id: 5,
      label: 'Contest C',
      url: '#',
    },
  ];

  const cover =
    'https://miro.medium.com/max/4800/1*znQJ9QO7vwypsv2mZPiUxQ.jpeg';
  return (
    <div className="container">
      <ContestNavBar selectedTab="past" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {contests.map((elem, i) => {
          return (
            <div
              key={i}
              className="w-full h-44 flex items-center justify-center"
            >
              <Link href={elem.url}>
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
                    <div className="bg-gray-600 bg-opacity-70 p-2 rounded">
                      {elem.label}
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
  return {
    props: {
      activeTab: 'contest',
    },
  };
}

export default PastContest;
