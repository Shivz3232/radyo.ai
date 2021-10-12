import React, { useEffect, useRef, useState } from 'react';
import { decode } from 'html-entities';
import ReactH5Player from 'react-h5-audio-player';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';
import LinesEllipsis from 'react-lines-ellipsis';
import { GrFormClose } from 'react-icons/gr';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import { useAudio } from '../../controllers/AudioProvider';
// import { GoogleCard } from './../AdCard/GoogleCard';
const AudioPlayer = props => {
  const { getNextTrack } = usePlaylist();
  const { trackInfo, playAudio } = useAudio();
  const audioRef = useRef();

  function playNext() {
    const nextTrack = getNextTrack(trackInfo);
    playAudio(() => {
      return getNextTrack(trackInfo);
    });
  }
  try {
    if (audioRef.current) {
      audioRef.current.audio.current.onended = e => {
        playNext();
        // console.log(e);
      };
    }
  } catch (err) {
    console.log(err);
  }

  useEffect(() => {
    props.hidePlayer(trackInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackInfo]);

  return (
    <>
      {/* {trackInfo.audioSrc && (
        <div className="ad-over-audio-player">
          <GoogleCard />
        </div>
      )} */}
      <div className="audio-player">
        <GrFormClose
          className="absolute right-4 top-1 cursor-pointer"
          onClick={() => {
            playAudio({
              audioSrc: '',
              coverSrc: '',
              title: '',
            });
          }}
        />
        <div className="track-info">
          <img
            className="track-info__cover"
            src={
              trackInfo && trackInfo.audioSrc
                ? trackInfo.coverSrc
                : '/lovebytes/images/Picture1.jpg'
            }
            alt="cover"
          />
          <div className="track-info__title max-h-20 overflow-clip">
            <LinesEllipsis
              text={
                trackInfo && trackInfo.audioSrc ? decode(trackInfo.title) : ''
              }
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        </div>
        <ReactH5Player
          ref={audioRef}
          src={trackInfo && trackInfo.audioSrc ? trackInfo.audioSrc : ''}
          style={{
            background: '#e3ddcc',
          }}
          className="player"
          showJumpControls={false}
          customIcons={{
            play: <FaPlay color="black" size={25} />,
            pause: <FaPause color="black" size={25} />,
            loop: <ImLoop color="black" size={20} />,
            volume: <FaVolumeUp color="black" size={20} />,
            volumeMute: <FaVolumeMute color="black" size={20} />,
          }}
        />
      </div>
    </>
  );
};

export default AudioPlayer;
