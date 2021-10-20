import React, { Component, useState, useEffect, useRef } from 'react';
import ChartRace from 'react-chart-race/ChartRace';
import axios from 'axios';
import useViewport from './useViewport';
import colorValues from './colorValues';

const LeaderBoard = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const { width } = useViewport(200);

  function getCreatorScore(audioplayCount, likesCount, subscriberCount) {
    //audioPlaycount of audios by creator in the month
    //likes of audios by creator in the month
    //subscriber gained by creator in the month --this is done
    const creatorScore = 5 * audioplayCount + 3 * likesCount + subscriberCount;
    return creatorScore;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const handleChange = async () => {
        const { data } = await axios
          .get('/api/creator/creator')
          .catch(err => console.log(err));
        if (data) {
          const arrayData = data.allAudio;
          setData(arrayData);
          const mappedData = [];
          const otherArray = arrayData
            .sort((a, b) => (a.value < b.value ? 1 : -1))
            .slice(0, 10);
          otherArray.map((item, index) => {
            const id = index;
            const title = item.creatorName;
            const value = getCreatorScore(
              item.playCount,
              item.audiosPublished,
              item.subscriberCount
            );
            const color = colorValues[index];
            mappedData.push({ id, title, value, color });
          });
          setSortedData(mappedData);
        }
      };
      handleChange();
    }, 10000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("Data in state", data);
  // console.log("Mapped Sorted Data", sortedData)

  return (
    <div className="lb-container w-full" id="leaderboard">
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
    </div>
  );
};

export default LeaderBoard;
