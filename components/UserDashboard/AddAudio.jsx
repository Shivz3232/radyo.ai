import axios from 'axios';
import React, { useState } from 'react';
import Select from 'react-select';
import RecordAudio from '../RecordAudio/RecordAudio';
import { useAuth } from '../../controllers/auth';
import { image_formats } from '../RecordAudio/fileFormats';
import TagsInput from './TagsInput';
import SuccessModal from './SuccessModal';
import { categoryDataLinks } from '../CategoryNavBar/categoryData';
import { useRouter } from 'next/router';

let Categories = categoryDataLinks.map(cat => {
  {
    return {
      value: cat.id,
      label: cat.label,
    };
  }
});

let CatOptions = Categories.filter(cat => cat.label != 'All');

const LanOptions = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
];

const AddAudio = () => {
  const router = useRouter();
  const { useremail } = useAuth();
  const [lanSelect, setLanSelect] = useState('');
  const [catSelect, setCatSelect] = useState('');
  const [audio, setAudio] = useState('');
  const [hashTags, setHashTags] = useState([]);
  const [textFields, setTextFields] = useState({
    title: '',
    description: '',
  });

  const [coverImg, setCoverImg] = useState('');
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState({
    msg: null,
    savingMsg: 'Please wait while we save your Awesome Creativity',
  });

  const handleClose = () => {
    setSubmit(false);
    router.reload(window.location.pathname);
  };

  const setAudioData = data => {
    setAudio(data);
  };

  const addHashTags = data => {
    setHashTags(
      data.map(e => {
        return e.value;
      })
    );
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

    if (!lanSelect) {
      alert('Please Select a Language!');
      return;
    }
    if (!catSelect) {
      alert('Please Select a Category!');
      return;
    }
    if (!textFields.title) {
      alert('Please Provide Title for your Audio!');
      return;
    }

    if (coverImg) {
      if (coverImg.size / 1000000 <= 1) {
        if (image_formats.includes(coverImg.type)) {
        } else {
          alert('Only jpeg, jpg, png formats are allowed!');
          return;
        }
      } else {
        alert('Cover Image file too Big, Max size is 1MB');
        return;
      }
    } else {
      alert('Please upload Cover Image for Audio!');
      return;
    }

    if (audio) {
      if (Math.round(audio.size / 1000000) < 9) {
        let formData = new FormData();
        formData.append('cat', catSelect);
        formData.append('lan', lanSelect);
        formData.append('title', textFields.title);
        formData.append('hashTags', hashTags);
        formData.append('description', textFields.description);
        formData.append('audioSrc', audio);
        formData.append('coverImg', coverImg);
        formData.append('email', useremail);
        setSubmit(true);

        await axios({
          method: 'post',
          url: '/api/addAudio',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(response => {
            if (response.status === 200) {
              setMessage({
                msg: 'Congratulations, your submission have been successfully uploaded. Your submission will be reviewed and published within 2 business days​!',
                savingMsg: null,
              });
            }
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
      {submit && <SuccessModal message={message} close={handleClose} />}
      <div className="pb-8">
        <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-white rounded-md shadow-xl">
          <form
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
              name="description"
              placeholder="Enter Audio Description"
              onChange={handleTextChange}
              value={textFields.description}
              required
            />
            <br />
            <TagsInput addHashTags={addHashTags} />
            <p className="mx-auto text-indigo-650">
              Upload cover photo of the audio :
            </p>
            <input
              className="input bg-white"
              type="file"
              id="img"
              name="coverImg"
              accept="image/*"
              onChange={e => setCoverImg(e.target.files[0])}
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
