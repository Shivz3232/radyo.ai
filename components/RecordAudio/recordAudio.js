import React, { useState, useRef } from 'react';

const recordAudio = () => {
  const [showRec, setShowRec] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [uploadedAudioSrc, setUploadedAudioSrc] = useState('');
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const stopRecording = useRef();
  const downloadLink = useRef();

  const handleChange = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setUploadedAudioSrc(url);
  };

  const MicOptions = () => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      devices = devices.filter(d => d.kind === 'audioinput');
      setDeviceList(devices);
      console.log(devices);
      RecordFromMic(devices);
    });
  };

  const RecordFromMic = devices => {
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: devices[0].deviceId } })
      .then(handleSuccess);
  };

  const handleSuccess = stream => {
    const options = { mimeType: 'audio/webm' };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function (e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      setAudioSrc(URL.createObjectURL(new Blob(recordedChunks)));
      downloadLink.current.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.current.download = 'testing.wav';
    });

    mediaRecorder.start();

    stopRecording.current.addEventListener('click', () => {
      mediaRecorder.stop();
    });
  };

  return (
    <div className="space-y-3">
      {/* <label htmlFor="devices">Choose a Device: </label>
         <select name="cars" id="cars">
            {deviceList.map((device) => {
               return <option value={device.deviceId}>{device.label}</option>;
            })}
         </select> */}
      <br />
      <label className="w-full rounded-md px-3 py-2 focus:outline-none bg-white mb-6">
        Upload the audio file:
      </label>
      <input
        className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
        type="file"
        accept="audio/*"
        capture
        id="uploadedAudio"
        placeholder="Upload"
        onChange={handleChange}
      />
      <br />
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
          <h3 className="mx-auto text-lg">Uploaded Audio</h3>
          <audio id="player2" controls src={uploadedAudioSrc}></audio> <br />
          <button onClick={MicOptions}>Start Recording</button>
          <br />
          <button ref={stopRecording}>Stop Recording</button>
          <br />
          <a ref={downloadLink} id="download">
            <h2>Download</h2>
          </a>
          <h3>Recorded Audio</h3>
          <audio id="player1" controls src={audioSrc}></audio> <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default recordAudio;
