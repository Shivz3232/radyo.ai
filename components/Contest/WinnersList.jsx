import React from 'react';
import Link from 'next/link';

const WinnersList = ({ contest_results }) => {
  //   console.log(contest_results);
  return (
    <div className="w-full p-2">
      <div className="flex border-b-2 border-indigo-650 text-lg text-left">
        <div className="w-min">Rank</div>
        <div className="flex-1 mobile:ml-16 ml-28">Name</div>
        <div className="w-16">Score</div>
      </div>
      {contest_results.map((elem, i) => {
        return (
          <Link key={i} href={`/creator/${elem.creatorUid}`}>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="flex text-lg text-left cursor-pointer hover:scale-105 hover:shadow-custom p-1">
                <div className="w-11 text-center">{elem.contest_rank}</div>
                <div className="flex-1 mobile:ml-16 ml-28">
                  {elem.creatorName} {elem.contest_rank === 1 ? '👑' : null}
                </div>
                <div className="w-14">{elem.creatorScore}</div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default WinnersList;
