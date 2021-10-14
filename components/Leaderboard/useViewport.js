import debounce from 'lodash.debounce';
import React from 'react';

const useViewport = divWidth => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const debounceHandleResize = debounce(function handleWindowResize() {
      const container = document.getElementById('leaderboard');
      const containerWidth = container.offsetWidth; 
      // if (window.innerWidth < 769) {
        setWidth(containerWidth);
        // } else {
        // setWidth(containerWidth);
      // }
    }, 300);
    window.addEventListener('resize', debounceHandleResize);
    return () => window.removeEventListener('resize', debounceHandleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(width);
  return { width };
};
export default useViewport;
