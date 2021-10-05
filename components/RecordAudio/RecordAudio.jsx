import React, { useState, useRef } from 'react';
import { ImMic } from 'react-icons/im';
import { FaStop } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaRedo } from 'react-icons/fa';
import Timer from './timer';

var mediaRecorder = null;

const RecordAudio = () => {
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
    stopRec.current.removeEventListener('click', null);
    startRec.current.disabled = false;
  };

  const RecordFromMic = async () => {
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
    mediaRecorder.stop();
    setRecordingOn(false);
    stopRec.current.disabled = true;
    startRec.current.disabled = true;
  };

  return (
    <div className="space-y-3">
      <p className="text-indigo-650">Upload your Audio File:</p>
      <input
        className="input bg-white"
        type="file"
        accept="audio/*"
        id="uploadedAudio"
        onChange={handleChange}
      />
      {fileUploaded && (
        <>
          <h3 className="text-indigo-650">Uploaded Audio:</h3>
          <audio
            className="w-full"
            id="player2"
            controls
            src={uploadedAudioSrc}
          ></audio>
        </>
      )}

      <p className="text-center text-indigo-650">OR</p>
      <button className="btn" onClick={() => setShowRec(true)} type="button">
        Click here to record your audio directly
      </button>
      {showRec && (
        <>
          <div className="flex mx-auto space-x-2">
            <button
              className="btn"
              onClick={RecordFromMic}
              type="button"
              ref={startRec}
            >
              <FaPlay className="inline mr-2 mb-1" />
              Start Recording
            </button>
            <button
              className="btn"
              onClick={handleStopRec}
              ref={stopRec}
              type="button"
            >
              <FaStop className="inline mr-2 mb-1" />
              Stop Recording
            </button>
          </div>
          {recordingOn && (
            <div className="text-center space-x-3 bg-gray-200 rounded-md">
              <ImMic className="inline mr-2 mb-1" />
              <Timer />
            </div>
          )}

          <p className="mx-auto text-indigo-650 ml-1">Recorded Audio</p>
          <div className="space-y-3 text-center">
            <audio className="w-full" id="player1" controls src={audioSrc} />
            <button
              onClick={() => reset()}
              type="button"
              className="text-white bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white hover:bg-gray-700 transition"
            >
              <FaRedo className="inline mr-2 mb-1" />
              <p className="inline">Record Again</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecordAudio;
