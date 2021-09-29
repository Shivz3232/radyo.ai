import React, { useState, useRef } from 'react';
import MicIcon from '@material-ui/icons/Mic';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import Timer from './timer';

const recordAudio = () => {
  const [showRec, setShowRec] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [uploadedAudioSrc, setUploadedAudioSrc] = useState('');
  const [recordingOn, setRecordingOn] = useState(false);
  const [fileUploaded, setfileUploaded] = useState(false);
  const stopRecording = useRef();
  
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

  const RecordFromMic = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  };

  const handleSuccess = stream => {
    const options = { mimeType: 'audio/webm' };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    setRecordingOn(true);

    mediaRecorder.addEventListener('dataavailable', function (e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      setAudioSrc(URL.createObjectURL(new Blob(recordedChunks)));
    });

    mediaRecorder.start();

    stopRecording.current.addEventListener('click', () => {
      setRecordingOn(false);
      stopRecording.current.disabled = true;
      mediaRecorder.stop();
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-indigo-600 font-semibold">Upload your Audio File:</p>
      <input
        className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
        type="file"
        accept="audio/*"
        id="uploadedAudio"
        onChange={handleChange}
      />
      {fileUploaded && (
        <>
          <h3 className="text-indigo-600 font-semibold">Uploaded Audio:</h3>
          <audio
            className="w-full"
            id="player2"
            controls
            src={uploadedAudioSrc}
          ></audio>
        </>
      )}

      <p className="text-center text-indigo-600 font-semibold">OR</p>
      <button
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white bg-indigo-600 font-semibold"
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
              className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white bg-indigo-600 font-semibold"
              onClick={RecordFromMic}
              type="button"
            >
              <PlayArrowRoundedIcon className="mr-1" />
              Start Recording
            </button>
            <button
              className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white bg-indigo-600 font-semibold"
              ref={stopRecording}
              type="button"
            >
              <StopRoundedIcon className="mr-1" />
              Stop Recording
            </button>
          </div>
          {recordingOn && (
            <div className="text-center space-x-3 bg-gray-200 rounded-md">
              <MicIcon />
              <Timer />
            </div>
          )}
          
          <p className="mx-auto text-indigo-600 font-semibold ml-1">
            Recorded Audio
          </p>
          <audio
            className="w-full"
            id="player1"
            controls
            src={audioSrc}
          ></audio>
          <br />
        </>
      )}
    </div>
  );
};

export default recordAudio;
{/* <RotateLeftIcon /> */}