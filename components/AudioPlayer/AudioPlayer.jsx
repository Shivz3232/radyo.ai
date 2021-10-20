import React, { useEffect, useRef, useState } from 'react';
import { decode } from 'html-entities';
import ReactH5Player from 'react-h5-audio-player';
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { RiSkipForwardFill, RiSkipBackFill } from 'react-icons/ri';
import { ImLoop } from 'react-icons/im';
import LinesEllipsis from 'react-lines-ellipsis';
import { AiOutlineClose } from 'react-icons/ai';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import { GoogleCard } from './../AdCard/GoogleCard';
const AudioPlayer = props => {
  const { trackInfo, playAudio, isPlaying, getNextTrack, getPreviousTrack } =
    usePlaylist();
  const audioRef = useRef();

  function playNext() {
    const nextTrack = getNextTrack();
    playAudio(nextTrack, nextTrack.id);
  }

  function playPrevious() {
    const prevTrack = getPreviousTrack();
    playAudio(prevTrack, prevTrack.id);
  }
  try {
    if (audioRef.current) {
      audioRef.current.audio.current.onended = e => {
        playNext();
      };
    }
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <div
        className="z-0 h-48 mobile:h-44"
        style={{ display: isPlaying ? '' : 'none' }}
      ></div>
      <div
        id="audio-player"
        className={`fixed w-full bottom-0 left-0 z-20`}
        style={{ display: isPlaying ? '' : 'none' }}
      >
        {isPlaying && (
          <div
            className="border border-red-500"
            style={{ width: '100%', height: '100px' }}
          >
            {/* <GoogleCard size="980x100" /> */}
            <img src="https://via.placeholder.com/980x100" alt="placeholder" />
          </div>
        )}
        <div className="audio-player">
          <AiOutlineClose
            className="absolute right-4 top-50 text-white cursor-pointer"
            // className="absolute right-0 z-50 -top-2 text-white text-lg mobile:text-base cursor-pointer rounded"
            color="white"
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
                isPlaying
                  ? trackInfo.coverSrc
                  : '/lovebytes/images/Picture1.jpg'
              }
              alt="cover"
            />
            <div className="track-info__title max-h-20 overflow-clip">
              <LinesEllipsis
                text={isPlaying ? decode(trackInfo.title) : ''}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </div>
          </div>
          <ReactH5Player
            ref={audioRef}
            src={isPlaying ? trackInfo.audioSrc : ''}
            style={{
              background: '#a08be0',
            }}
            className="player"
            showSkipControls={true}
            showJumpControls={false}
            customIcons={{
              play: <FaPlay color="white" size={25} />,
              pause: <FaPause color="white" size={25} />,
              loop: <ImLoop color="white" size={20} />,
              volume: <FaVolumeUp color="white" size={20} />,
              volumeMute: <FaVolumeMute color="white" size={20} />,
              next: <RiSkipForwardFill color="white" size={20} />,
              previous: <RiSkipBackFill color="white" size={20} />,
            }}
            onClickPrevious={playPrevious}
            onClickNext={playNext}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
