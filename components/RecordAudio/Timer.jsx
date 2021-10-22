import React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Timer = () => {
  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      limit="00:10:00"
      onCallback={() => console.log('Finish')}
      render={({ formatted }) => {
        return <>{formatted}</>;
      }}
    />
  );
};

export default Timer;
