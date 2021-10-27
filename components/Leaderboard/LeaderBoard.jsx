import React, { Component, useState, useEffect, useRef } from 'react';
import ChartRace from 'react-chart-race/ChartRace';
import axios from 'axios';
import useViewport from './useViewport';
import colorValues from './colorValues';

// function getCreatorScore(audioplayCount, likesCount, subscriberCount) {
//   const creatorScore = 5 * audioplayCount + 3 * likesCount + subscriberCount;
//   return creatorScore;
// }
const LeaderBoard = ({ contestId }) => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const { width } = useViewport();

  // console.log(id);

  useEffect(() => {
    setSortedData([]);
  }, [contestId]);

  useEffect(() => {
    const timer = setInterval(() => {
      const handleChange = async () => {
        const data = await axios
          .get(`/api/creator/creatorScore?contestId=${contestId}`)
          .catch(err => console.log(err));
        if (data) {
          const arrayData = data.data.allCreators;
          setData(arrayData);
          const mappedData = [];
          const otherArray = arrayData
            .sort((a, b) => {
              const updateContest = element =>
                element.contestId.toString() === contestId.toString();
              const indexofA = a.creatorScore.findIndex(updateContest);
              const indexofB = b.creatorScore.findIndex(updateContest);
              if (indexofA !== -1 && indexofB !== -1) {
                return a.creatorScore[indexofA].score <
                  b.creatorScore[indexofB].score
                  ? 1
                  : -1;
              } else return 0;
            })
            .splice(0, 10);
          // console.log(arrayData, '<-->other', otherArray);
          otherArray.map((item, index) => {
            const id = index;
            const title = item.creatorName;
            const updateContest = element =>
              element.contestId.toString() === contestId.toString();
            const indexof = item.creatorScore.findIndex(updateContest);
            let value;
            if (indexof !== -1) {
              value = item.creatorScore[indexof].score;
            } else value = 0;
            const color = colorValues[index];
            mappedData.push({ id, title, value, color });
          });
          setSortedData(mappedData);
        }
      };
      handleChange();
    }, 10000);

    return () => clearInterval(timer);
  }, [contestId]);

  return (
    <div className="lb-container w-full" id="leaderboard">
      {sortedData.length === 0 ? (
        <div className="h-96 flex items-center justify-center">
          <div className=" animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <ChartRace
          data={sortedData}
          backgroundColor="#FFF"
          width={width}
          padding={3}
          itemHeight={23}
          gap={15}
          titleStyle={{
            display: 'inline',
            font: 'normal 400 12px Poppins',
            color: '#000',
          }}
          valueStyle={{
            display: 'inline',
            font: 'normal 400 12px Poppins',
            color: '#000',
          }}
        />
      )}
    </div>
  );
};

export default LeaderBoard;
