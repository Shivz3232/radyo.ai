import axios from 'axios';
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

  const isPlaying = () => {
    if (trackInfo.audioSrc !== '') return true;
    else return false;
  };

  const playAudio = (info, id) => {
    setTrackInfo(info);
    axios
      .post(`/api/update_count/${id}`, { update: { playCount: 1 } })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return (
    <AudioContext.Provider value={{ trackInfo, playAudio }}>
      {children}
    </AudioContext.Provider>
  );
};
