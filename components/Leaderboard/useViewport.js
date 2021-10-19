import debounce from 'lodash.debounce';
import React from 'react';

const useViewport = divWidth => {
  const [width, setWidth] = React.useState(() => {
    try {
      const container = document.getElementById('leaderboard');
      const containerWidth = container.offsetWidth;
      return containerWidth;
    } catch (err) {}
  });

  React.useEffect(() => {
    const container = document.getElementById('leaderboard');
    const containerWidth = container.offsetWidth;
    setWidth(containerWidth);
  }, []);

  React.useEffect(() => {
    const debounceHandleResize = debounce(function handleWindowResize() {
      const container = document.getElementById('leaderboard');
      const containerWidth = container.offsetWidth;
      setWidth(containerWidth);
    }, 500);
    window.addEventListener('resize', debounceHandleResize);

    return () => window.removeEventListener('resize', debounceHandleResize);
  }, []);

  return { width };
};
export default useViewport;
