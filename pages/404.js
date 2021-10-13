import React from 'react';
import custom404 from '../assets/404.svg';

const Custom404 = () => {
  return (
    <div className="w-full h-screen overflow-y-clip flex items-center justify-center">
      <div className="flex items-center justify-center">
        <img
          className="w-2/3 h-2/3 mobile:h-5/6 mobile:w-5/6"
          src={custom404.src}
          alt="404"
        />
      </div>
    </div>
  );
};

export default Custom404;
