import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import RecordAudio from '../RecordAudio/RecordAudio';
import { useAuth } from '../../controllers/auth';
import { BsPatchCheckFill } from 'react-icons/bs';

const CatOptions = [
  { value: 'cat-1', label: 'Category1' },
  { value: 'cat-2', label: 'Category2' },
  { value: 'cat-3', label: 'Category3' },
];

const LanOptions = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
];

const AddAudio = () => {
  const { useremail } = useAuth();
  const [lanSelect, setLanSelect] = useState('');
  const [catSelect, setCatSelect] = useState('');
  const [audio, setAudio] = useState('');
  const [textFields, setTextFields] = useState({
    title: '',
    hashTags: '',
    description: '',
  });
  const [coverImg, setCoverImg] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async e => {
    e.preventDefault();

    if (audio) {
      if (Math.round(audio.size / 1000000) < 9) {
        let formData = new FormData();
        formData.append('cat', catSelect);
        formData.append('lan', lanSelect);
        formData.append('title', textFields.title);
        formData.append('hashTags', textFields.hashTags);
        formData.append('description', textFields.description);
        formData.append('audioSrc', audio);
        formData.append('coverImg', coverImg);
        formData.append('email', useremail);
        setSubmitted(true);
        await axios({
          method: 'post',
          url: '/api/addAudio',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert('File too Big, please upload a file less than 10Mb');
      }
    } else {
      alert('Only mp3, wav, ogg formats with size less than 10Mb are allowed!');
    }
  };

  return (
    <>
      <div className="pb-8">
        <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-white rounded-md shadow-xl">
          <form
            action=""
            method="POST"
            encType="multipart/form-data"
            className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6 "
          >
            <p className="text-center text-indigo-650 text-lg">
              Share your talent, have fun, win prizes, get a fan following​!
            </p>
            <p className="mx-auto text-indigo-650 text-md">Select Category :</p>
            <Select
              className="border-2 bg-gray-100 border-indigo-650 rounded-md focus:ring-1 focus:ring-indigo-650"
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
              className="input bg-white"
              type="text"
              name="title"
              placeholder="Enter title of the submission (max 10 words)​"
              onChange={handleTextChange}
              value={textFields.title}
              required
            />
            <br />
            <input
              className="input bg-white"
              type="text"
              name="hashTags"
              placeholder="Enter comma separate keywords, hashtags​"
              onChange={handleTextChange}
              value={textFields.hashTags}
              required
            />
            <input
              className="input bg-white"
              type="text"
              name="description"
              placeholder="Enter Audio Description"
              onChange={handleTextChange}
              value={textFields.description}
              required
            />
            <br />
            <p className="mx-auto text-indigo-650">
              Upload cover photo of the audio :
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
            <hr className="border-0 border-b-2 border-indigo-650 mx-auto h-2 w-36" />
            <RecordAudio AudioData={setAudioData} />
            <hr className="border-0 border-b-2 border-indigo-650 mx-auto h-2 w-36" />
            <div className="pt-7 text-center">
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAudio;

{/* {submitted && (
  <h2 className="inline ml-3 text-green-600 text-lg">
    <BsPatchCheckFill className="md:inline mr-2 text-xl" />
    Audio Submitted
  </h2>
)} */}