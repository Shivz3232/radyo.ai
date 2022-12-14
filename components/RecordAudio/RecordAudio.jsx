import React, { useState, useRef } from 'react';
import { ImMic } from 'react-icons/im';
import { FaStop } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { FaRedo } from 'react-icons/fa';
import Timer from './Timer';
import { audio_formats } from './fileFormats';

var mediaRecorder = null;

const RecordAudio = ({ AudioData }) => {
  const [audioSrc, setAudioSrc] = useState('');
  const [uploadedAudioSrc, setUploadedAudioSrc] = useState('');
  const [showRec, setShowRec] = useState(false);
  const [recordingOn, setRecordingOn] = useState(false);
  const [fileUploaded, setfileUploaded] = useState(false);
  const stopRec = useRef();
  const startRec = useRef();

  const handleChange = e => {
    const file = e.target.files[0];
    let fileSize = Math.round(file.size / 1000000);

    if (fileSize < 9) {
      if (audio_formats.includes(file.type)) {
        if (file) {
          const url = URL.createObjectURL(file);
          setUploadedAudioSrc(url);
          setfileUploaded(true);
          AudioData(file);
        } else {
          setfileUploaded(false);
        }
      } else {
        alert('Only mp3, wav, ogg formats are allowed!');
      }
    } else {
      alert('File too Big, please select a file less than 10Mb');
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
      var blob = new Blob(recordedChunks);
      console.log(blob);
      setAudioSrc(URL.createObjectURL(new Blob(recordedChunks)));
      AudioData(new Blob(recordedChunks));
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
    <>
      <div className="space-y-3">
        <p className="text-indigo-650">Upload your Audio File :</p>
        <input
          className="input bg-white"
          type="file"
          accept="audio/*"
          onChange={handleChange}
        />
        {fileUploaded && (
          <>
            <h3 className="text-indigo-650">Uploaded Audio :</h3>
            <audio className="w-full" controls src={uploadedAudioSrc}></audio>
          </>
        )}

        <p className="text-center text-indigo-650">OR</p>
        <button
          className="btn bg-white text-gray-900 border-2 border-indigo-650 hover:text-white hover:bg-indigo-650 transition"
          onClick={() => setShowRec(true)}
          type="button"
        >
          Click here to record your audio directly
        </button>
        {showRec && (
          <>
            <div className="flex mx-auto space-x-2">
              <button
                className={recordingOn ? 'btn bg-gray-500' : 'btn'}
                onClick={RecordFromMic}
                type="button"
                ref={startRec}
              >
                <FaPlay className="inline mr-2 mb-1" />
                Start Recording
              </button>
              <button
                className={recordingOn ? 'btn' : 'btn bg-gray-500'}
                onClick={handleStopRec}
                ref={stopRec}
                type="button"
              >
                <FaStop className="inline mr-2 mb-1" />
                Stop Recording
              </button>
            </div>

            {recordingOn && (
              <div className="text-center space-x-3 bg-gray-200 rounded-md shadow-md">
                <ImMic className="inline mr-2 mb-1" />
                <Timer />
              </div>
            )}

            <p className="mx-auto text-indigo-650 ml-1">Recorded Audio</p>
            <div className="space-y-3 text-center">
              <audio className="w-full" controls src={audioSrc} />
              {audioSrc && (
                <>
                  <button
                    onClick={() => reset()}
                    type="button"
                    className="text-white bg-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white hover:bg-gray-700 transition"
                  >
                    <FaRedo className="inline mr-2 mb-1" />
                    <p className="inline">
                      Not happy with Recording? Record Again
                    </p>
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecordAudio;
