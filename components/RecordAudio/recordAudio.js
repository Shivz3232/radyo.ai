import React, { useState, useRef } from 'react';
// import MicIcon from '@material-ui/icons/Mic';
// import RotateLeftIcon from '@material-ui/icons/RotateLeft';
// import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
// import StopRoundedIcon from '@material-ui/icons/StopRounded';
// import Button from '@material-ui/core/Button';
// import VscDebugRestart from 'react-icons';
// import ImMic from 'react-icons';
// import BsFillStopFill from 'react-icons';
// import FaPlay from 'react-icons'
import Timer from './timer';

var mediaRecorder = null;

const recordAudio = () => {
  const [audioSrc, setAudioSrc] = useState('');
  const [uploadedAudioSrc, setUploadedAudioSrc] = useState('');
  const [showRec, setShowRec] = useState(false);
  const [recordingOn, setRecordingOn] = useState(false);
  const [fileUploaded, setfileUploaded] = useState(false);
  const stopRec = useRef();
  const startRec = useRef();

  const handleChange = e => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedAudioSrc(url);
      setfileUploaded(true);
    } else {
      setfileUploaded(false);
    }
  };

  const reset = () => {
    setAudioSrc('');
    stopRec.current.removeEventListener('click', null); //can be removed
    startRec.current.disabled = false;
  };

  const RecordFromMic = async () => {
    console.log("Start clicked");
    if (!mediaRecorder) {
      await navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then(stream => {
          const options = { mimeType: 'audio/webm' };
          mediaRecorder = new MediaRecorder(stream, options);
        });
    }
    handleSuccess();
  };

  const handleSuccess = () => {
    setRecordingOn(true);
    stopRec.current.disabled = false;

    let recordedChunks = [];
    mediaRecorder.addEventListener('dataavailable', function (e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      setAudioSrc(URL.createObjectURL(new Blob(recordedChunks)));
    });
    mediaRecorder.start();
  };

  const handleStopRec = () => {
    console.log("Stop Clicked");
    mediaRecorder.stop();
    setRecordingOn(false);
    stopRec.current.disabled = true;
    startRec.current.disabled = true;
  }

  return (
    <div className="space-y-3">
      <p className="text-indigo-650 font-semibold">Upload your Audio File:</p>
      <input
        className="w-full border-2 border-indigo-650 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
        type="file"
        accept="audio/*"
        id="uploadedAudio"
        onChange={handleChange}
      />
      {fileUploaded && (
        <>
          <h3 className="text-indigo-650 font-semibold">Uploaded Audio:</h3>
          <audio
            className="w-full"
            id="player2"
            controls
            src={uploadedAudioSrc}
          ></audio>
        </>
      )}

      <p className="text-center text-indigo-650 font-semibold">OR</p>
      <button
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white bg-indigo-650 font-semibold"
        onClick={e => {
          e.preventDefault();
          setShowRec(true);
        }}
      >
        Click here to record your audio directly
      </button>
      {showRec && (
        <>
          <div className="flex mx-auto space-x-2">
            <button
              className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white bg-indigo-650 font-semibold"
              onClick={RecordFromMic}
              type="button"
              ref={startRec}
            >
              {/* <FaPlay className="mr-1" /> */}
              Start Recording
            </button>
            <button
              className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white bg-indigo-650 font-semibold"
              onClick={handleStopRec}
              ref={stopRec}
              type="button"
            >
              {/* <BsFillStopFill className="mr-1" /> */}
              Stop Recording
            </button>
          </div>
          {recordingOn && (
            <div className="text-center space-x-3 bg-gray-200 rounded-md">
              {/* <ImMic /> */}
              <Timer />
            </div>
          )}

          <p className="mx-auto text-indigo-650 font-semibold ml-1">
            Recorded Audio
          </p>
          <div className="space-y-3 text-center">
            <audio
              className="w-full sm:"
              id="player1"
              controls
              src={audioSrc}
            />
            <button
              onClick={e => {
                e.preventDefault();
                reset();
              }}
              className="rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-indigo-650 font-semibold"
            >
              {/* <VscDebugRestart /> */}
              <p className="text-gray-800">Record Again</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default recordAudio;


{
  /* <Button onClick={reset} size="large">
              <VscDebugRestart />
              <p className="text-gray-800">Record Again</p>
            </Button> */
}
