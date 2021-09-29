import React, { useState, useRef } from 'react';
import MicIcon from '@material-ui/icons/Mic';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import StopRoundedIcon from '@material-ui/icons/StopRounded';

const recordAudio = () => {
  const [showRec, setShowRec] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [uploadedAudioSrc, setUploadedAudioSrc] = useState('');
  const stopRecording = useRef();
  const [recordingOn, setRecordingOn] = useState(false);
  
  const handleChange = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedAudioSrc(url);
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
        capture
        id="uploadedAudio"
        onChange={handleChange}
      />
      <h3 className="text-indigo-600 font-semibold">Uploaded Audio:</h3>
      <audio id="player2" controls src={uploadedAudioSrc}></audio>
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
          <div className="flex mx-auto space-x-1">
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
            <div className="text-center space-x-3">
              <RotateLeftIcon />
              <MicIcon />
            </div>
          )}
          <br />
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

{
  /* <label htmlFor="devices">Choose a Device: </label>
         <select name="cars" id="cars">
            {deviceList.map((device) => {
               return <option value={device.deviceId}>{device.label}</option>;
            })}
         </select> */
}



{
  /* <a ref={downloadLink} id="download">
  <h2>Download</h2>
</a>; */
}

// const downloadLink = useRef();
// downloadLink.current.href = URL.createObjectURL(new Blob(recordedChunks));
// downloadLink.current.download = 'testing.wav';

// const MicOptions = () => {
//   navigator.mediaDevices.enumerateDevices().then(devices => {
//     devices = devices.filter(d => d.kind === 'audioinput');
//     setDeviceList(devices);
//     console.log(devices);
//     RecordFromMic(devices);
//   });
// };

// const [selectedDevice, setSelectedDevice] = useState({});
// const [deviceList, setDeviceList] = useState([]);
