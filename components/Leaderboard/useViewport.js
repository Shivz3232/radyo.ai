import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';

const useViewport = divWidth => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const debounceHandleResize = debounce(function handleWindowResize() {
      if (window.innerWidth < 622) {
        //setWidth(400)
        //setWidth(divWidth-200);
        setWidth(divWidth - 100);
      } else {
        //setWidth(window.innerWidth-400);
        //setWidth(divWidth +100)
        setWidth(50);
      }
    }, 10000);
    window.addEventListener('resize', debounceHandleResize);
    return () => window.removeEventListener('resize', debounceHandleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(width);
  return { width };
};
export default useViewport;
