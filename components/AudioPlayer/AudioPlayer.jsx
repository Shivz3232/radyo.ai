import React from 'react';
import ReactH5Player from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';
// import { GoogleCard } from './../AdCard/GoogleCard';
const AudioPlayer = ({ trackInfo, autoplay }) => {
  return (
    <>
      {/* {trackInfo.audioSrc && (
        <div className="ad-over-audio-player">
          <GoogleCard />
        </div>
      )} */}
      <div className="audio-player">
        <div className="track-info">
          <img
            className="track-info__cover"
            src={trackInfo.coverSrc}
            alt="cover"
          />
          <p className="track-info__title">{trackInfo.title}</p>
        </div>
        <ReactH5Player
          src={trackInfo.audioSrc}
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
