import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/localStorage';

const PlaylistContext = createContext({});
export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [contextPlaylist, setContextPlaylist] = useLocalStorage(
    'contextPlaylist',
    []
  );
  useEffect(() => {
    if (contextPlaylist && !contextPlaylist.length) {
      axios
        .get(`/api/newreleases`)
        .then(res => setContextPlaylist(res.data.allAudio))
        .catch(err => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getNextTrack(trackInfo) {
    if (contextPlaylist.length > 0)
      var index = contextPlaylist.findIndex(e => {
        if (e.title === trackInfo.title && e.audioSrc === trackInfo.audioSrc)
          return true;
        else return false;
      });
    if (contextPlaylist && index + 1 === contextPlaylist.length) {
      return {
        audioSrc: contextPlaylist[0].audioSrc,
        coverSrc: contextPlaylist[0].coverImage,
        title: contextPlaylist[0].title,
      };
    } else if (contextPlaylist && contextPlaylist[index]) {
      return {
        audioSrc: contextPlaylist[index + 1].audioSrc,
        coverSrc: contextPlaylist[index + 1].coverImage,
        title: contextPlaylist[index + 1].title,
      };
    }
  }

  const [trackInfo, setTrackInfo] = useLocalStorage('currentTrack', {
    audioSrc: '',
    coverSrc: '',
    title: '',
  });
  useEffect(() => {
    setTrackInfo({
      audioSrc: '',
      coverSrc: '',
      title: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isPlaying = () => {
    if (trackInfo.audioSrc !== '') return true;
    else return false;
  };

  const playAudio = (info, id) => {
    setTrackInfo(info);
    if (id)
      axios
        .post(`/api/update_count/${id}`, { update: { playCount: 1 } })
        // .then(res => console.log(res))
        .catch(err => console.log(err));
  };

  return (
    <PlaylistContext.Provider
      value={{
        contextPlaylist,
        setContextPlaylist,
        getNextTrack,
        trackInfo, playAudio, isPlaying
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
