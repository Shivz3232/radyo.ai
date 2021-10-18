import debounce from 'lodash.debounce';
import React from 'react';

const useViewport = divWidth => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const container = document.getElementById('leaderboard');
    const containerWidth = container.offsetWidth;
    window.onload = () => {
      setWidth(containerWidth);
    };
  }, []);

  React.useEffect(() => {
    const debounceHandleResize = debounce(function handleWindowResize() {
      const container = document.getElementById('leaderboard');
      const containerWidth = container.offsetWidth;
      setWidth(containerWidth);
    }, 300);
    window.addEventListener('resize', debounceHandleResize);

    return () => window.removeEventListener('resize', debounceHandleResize);
  }, []);


  return { width };
};
export default useViewport;
