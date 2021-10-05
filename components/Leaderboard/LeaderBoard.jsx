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
    const creatorScore = 5 * audioplayCount + 3 * likesCount + subscriberCount;
    return creatorScore;
  }
  // console.log("width", width);
  const colorValues = [
    'rgb(199, 21, 133)',
    'rgba(0, 224, 255, 1)',
    'rgba(255, 255, 0, 1)',
    'rgb(182, 119, 33)',
    'rgb(77, 137, 99)',
    'rgb(255,165,0)',
    'rgb(0, 100, 0)',
    'rgba(234, 133, 255, 23)',
    'rgb(50,23,77)',
    'rgb(255,0,0)',
    'rgb(180, 127, 80)',
    'rgb(242, 194, 203)',
  ];
  const cValues = [];

  useEffect(() => {
    const timer = setInterval(() => {
      const handleChange = async () => {
        const { data } = await axios.get('/api/creator/creator');
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
      };
      handleChange();
    }, 10000);

    //return()=> clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("Data in state", data);
  // console.log("Mapped Sorted Data", sortedData)

  return (
    <div className="lb-container">
      <ChartRace
        data={sortedData}
        backgroundColor="#FFF"
        width={width}
        padding={3}
        itemHeight={15}
        gap={5}
        titleStyle={{ font: 'normal 400 6px Poppins', color: '#000' }}
        valueStyle={{ font: 'normal 400 4px Poppins', color: '#000' }}
      />
    </div>
  );
};

export default LeaderBoard;
