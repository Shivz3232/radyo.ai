import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/localStorage';

const AudioContext = createContext({});
export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });
  //   useEffect(() => {
  //     setTrackInfo({
  //       audioSrc: '',
  //       coverSrc: '',
  //       title: '',
  //     });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);
  const playAudio = info => setTrackInfo(info);
  return (
    <AudioContext.Provider value={{ trackInfo, playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
