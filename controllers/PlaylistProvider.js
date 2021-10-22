import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/localStorage';

const PlaylistContext = createContext({});
export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [trackInfo, setTrackInfo] = useLocalStorage('currentTrack', {
    audioSrc: '',
    coverSrc: '',
    title: '',
  });
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

  function getNextTrack() {
    if (contextPlaylist.length > 0)
      var index = contextPlaylist.findIndex(e => {
        if (e.title === trackInfo.title && e.audioSrc === trackInfo.audioSrc)
          return true;
        else return false;
      });
    if (contextPlaylist && index + 1 === contextPlaylist.length) {
      return {
        id: contextPlaylist[0]._id,
        audioSrc: contextPlaylist[0].audioSrc,
        coverSrc: contextPlaylist[0].coverImage,
        title: contextPlaylist[0].title,
      };
    } else if (contextPlaylist && contextPlaylist[index]) {
      return {
        id: contextPlaylist[index + 1]._id,
        audioSrc: contextPlaylist[index + 1].audioSrc,
        coverSrc: contextPlaylist[index + 1].coverImage,
        title: contextPlaylist[index + 1].title,
      };
    }
  }

  function getPreviousTrack() {
    if (contextPlaylist.length > 0)
      var index = contextPlaylist.findIndex(e => {
        if (e.title === trackInfo.title && e.audioSrc === trackInfo.audioSrc)
          return true;
        else return false;
      });
    if (contextPlaylist && index - 1 === -1) {
      return {
        id: contextPlaylist[contextPlaylist.length - 1]._id,
        audioSrc: contextPlaylist[contextPlaylist.length - 1].audioSrc,
        coverSrc: contextPlaylist[contextPlaylist.length - 1].coverImage,
        title: contextPlaylist[contextPlaylist.length - 1].title,
      };
    } else if (contextPlaylist && contextPlaylist[index]) {
      return {
        id: contextPlaylist[index - 1]._id,
        audioSrc: contextPlaylist[index - 1].audioSrc,
        coverSrc: contextPlaylist[index - 1].coverImage,
        title: contextPlaylist[index - 1].title,
      };
    }
  }

  useEffect(() => {
    setTrackInfo({
      audioSrc: '',
      coverSrc: '',
      title: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = (info, id) => {
    if (info.audioSrc === '') setIsPlaying(false);
    else setIsPlaying(true);
    setTrackInfo(info);
    if (id)
      axios
        .post(`/api/update_play_count/${id}`, { AudioId: id })
        // .then(res => console.log(res))
        .catch(err => console.log('oops', err));

    //refresh ad
    // let Iframe = document.getElementById('aswift_0');
    // if (Iframe) {
    //   try {
    //     Iframe.src = Iframe.src;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <PlaylistContext.Provider
      value={{
        contextPlaylist,
        setContextPlaylist,
        getNextTrack,
        trackInfo,
        playAudio,
        isPlaying,
        getPreviousTrack,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
