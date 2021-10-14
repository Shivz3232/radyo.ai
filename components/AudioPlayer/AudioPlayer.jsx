import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import ReactH5Player from 'react-h5-audio-player';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { ImLoop } from 'react-icons/im';
import LinesEllipsis from 'react-lines-ellipsis';
import { GrFormClose } from 'react-icons/gr';
// import { GoogleCard } from './../AdCard/GoogleCard';
const AudioPlayer = props => {
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });
  useEffect(() => {
    setTrackInfo(props.trackInfo);
  }, [props.trackInfo]);
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
            props.play({
              audioSrc: '',
              coverSrc: '',
              title: '',
            });
          }}
        />
        <div className="track-info">
          <img
            className="track-info__cover"
            src={trackInfo.coverSrc}
            alt="cover"
          />
          <div className="track-info__title max-h-20 overflow-clip">
            <LinesEllipsis
              text={decode(trackInfo.title)}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
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
