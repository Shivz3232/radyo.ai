import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import RecordAudio from '../RecordAudio/RecordAudio';

const CatOptions = [
  { value: 'Cat1', label: 'Category1' },
  { value: 'Cat2', label: 'Category2' },
  { value: 'Cat3', label: 'Category3' },
];

const LanOptions = [
  { value: 'eng', label: 'English' },
  { value: 'hin', label: 'Hindi' },
];

const addAudio = () => {
  const [lanSelect, setLanSelect] = useState('');
  const [catSelect, setCatSelect] = useState('');
  const [audio, setAudio] = useState('');
  const [textFields, setTextFields] = useState({
    title: '',
    hashTags: '',
  });
  const [coverImg, setCoverImg] = useState('');
  
  const setAudioData = data => {
    setAudio(data);
  };
  
  
  const handleTextChange = e => {
    const { name, value } = e.target;
    setTextFields(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('cat',catSelect);
    formData.append('lan',lanSelect);
    formData.append('title',textFields.title);
    formData.append('hashTags',textFields.hashTags);
    formData.append('audiofile',audio);
    formData.append('coverImg',coverImg);
    await axios({
      method: 'post',
      url: '/api/addAudio',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(function (response) {
      //handle success
      console.log(response);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
    
  };
  
  return (
    <>
      <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
        <form
          action=""
          method="POST"
          encType="multipart/form-data"
          className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
        >
          <p className="text-center text-indigo-650 text-lg">
            Share your talent, have fun, win prizes, get a fan following​!
          </p>
          <p className="mx-auto text-indigo-650 text-md">Select Category :</p>
          <Select
            className="border-2 border-indigo-650 rounded-md focus:ring-1 focus:ring-indigo-650"
            options={CatOptions}
            name="cat"
            onChange={e => setCatSelect(e.value)}
          />
          <p className="mx-auto text-indigo-650 text-md">Select Language :</p>
          <Select
            className="border-2 border-indigo-650 rounded-md focus:ring-1 focus:ring-indigo-650"
            options={LanOptions}
            name="lan"
            onChange={e => setLanSelect(e.value)}
          />
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Enter title of the submission (max 10 words)​"
            onChange={handleTextChange}
            value={textFields.title}
            required
          />
          <br />
          <input
            className="input"
            type="text"
            name="hashTags"
            placeholder="Enter comma separate keywords, hashtags​"
            onChange={handleTextChange}
            value={textFields.hashTags}
            required
          />
          <br />
          <hr className="border-0 border-b-2 border-indigo-650 mx-auto h-2 w-36" />
          <RecordAudio AudioData={setAudioData} />
          <hr className="border-0 border-b-2 border-indigo-650 mx-auto h-2 w-36" />
          <p className="mx-auto text-indigo-650">
            Upload cover photo of the audio:
          </p>
          <input
            className="input bg-white"
            type="file"
            id="img"
            name="coverImg"
            accept="image/*"
            onChange={e => {
              setCoverImg(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default addAudio;