import React from 'react';

const ContestCard = ({ contest, endContest }) => {
  return (
    <div className="rounded-md shadow-custom m-2 flex flex-col items-center justify-center">
      <div className="my-2 font-bold">{contest.name}</div>
      <div className="my-2">
        Start Date : {new Date(contest.startDate).toDateString()}
      </div>
      <div className="my-2">
        End Date : {new Date(contest.endDate).toDateString()}
      </div>
      <button
        onClick={()=>{endContest(contest._id.toString())}}
        className="my-2 p-2 border border-red-500 rounded-md text-white bg-red-500 hover:bg-white hover:text-red-500"
      >
        End contest
      </button>
    </div>
  );
};

export default ContestCard;
