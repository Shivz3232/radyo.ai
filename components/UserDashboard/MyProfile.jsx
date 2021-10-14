import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import avatar from '../../assets/Avatar.png';
import axios from 'axios';
import { image_formats } from '../RecordAudio/fileFormats';
import SuccessModal from './SuccesModal';
import { useRouter } from 'next/router';

const MyProfile = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    creatorName: '',
    contact: '',
    email: '',
    about: '',
    uid: '',
  });
  const [imgSrc, setImgSrc] = useState(avatar.src);
  const [profileImg, setprofileImg] = useState('');
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState({
    msg: null,
    savingMsg: 'Updating Profile',
  });
  const profileLink = useRef();

  useEffect(() => {
    setTimeout(async () => {
      if (firebase.auth().currentUser) {
        const user = await firebase.auth().currentUser.email;
        const data = {
          user: user,
        };
        await axios({
          method: 'post',
          url: '/api/getUserProfile',
          data: data,
          headers: { 'Content-Type': 'application/json' },
        })
          .then(user => {
            const details = user.data[0];
            const userData = {
              creatorName: details.creatorName,
              contact: details.contact,
              email: details.email,
              about: details.about,
              uid: details.uid,
            };
            setInputData(userData);
            setImgSrc(details.avatarImage);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, 1500);
  }, []);

  const handleSubmit = async e => {
    // File Validation
    if (profileImg) {
      if (profileImg.size / 1000000 <= 1) {
        if (image_formats.includes(profileImg.type)) {
          console.log('Submitting');
        } else {
          alert('Only jpeg, jpg, png formats are allowed!');
          return;
        }
      } else {
        alert('File too large (Max size :1MB)');
        return;
      }
    }

    let formData = new FormData();
    formData.append('email', inputData.email);
    formData.append('creatorName', inputData.creatorName);
    formData.append('contact', inputData.contact);
    formData.append('about', inputData.about);
    formData.append('avatarImage', profileImg);
    setSubmit(true);

    await axios({
      method: 'post',
      url: '/api/updateUserProfile',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        if (response.status === 200) {
          setMessage({
            msg: 'Congratulations, your profile has been successfully updated!',
            savingMsg: null,
          });
        }
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputData(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleClose = () => {
    setSubmit(false);
    router.reload(window.location.pathname);
  };

  const copyToClipboard = e => {
    navigator.clipboard.writeText(profileLink.current.innerText);
    e.target.innerText = 'Copied!';
    e.target.classList.add('bg-green-600');
    setTimeout(() => {
      e.target.innerText = 'Copy Link';
      e.target.classList.remove('bg-green-600');
    }, 5000);
  };

  return (
    <>
      {submit && <SuccessModal message={message} close={handleClose} />}
      <div className="mb-10">
        <div className="text-indigo-650 w-11/12 sm:w-3/6 mx-auto p-6 pt-3 bg-white rounded-md shadow-xl">
          <div className="mx-auto mb-2 hover:scale-105 transform transition max-w-xs">
            <img
              src={imgSrc}
              alt="avatar"
              className="h-20 w-20 rounded-full mx-auto bg-gray-200 align-middle block"
            />
            <p className="text-center text-gray-900">{inputData.email}</p>
          </div>

          <div>
            <div className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6">
              <div className="bg-gray-200 mx-auto p-2 rounded-md mb-2 flex flex-col">
                <p className="text-gray-900 text-center">Public Profile Link</p>
                <p
                  className="text-center text-indigo-650"
                  ref={profileLink}
                >{`www.radyo.ai/creator/${inputData.uid}`}</p>
                <button
                  className="text-white text-sm mx-auto bg-indigo-650 m-2  rounded-md p-2 hover:scale-105 transform transition"
                  onClick={copyToClipboard}
                >
                  Copy Link
                </button>
              </div>
              <p className="text-center text-indigo-650 text-xl">
                Tell us more about you!
              </p>
              <input
                className="input"
                type="text"
                name="creatorName"
                placeholder="Full name"
                onChange={handleChange}
                value={inputData.creatorName}
                required
              />
              <br />
              <input
                className="input"
                type="tel"
                pattern="[0-9]{10}"
                name="contact"
                placeholder="Contact number"
                onChange={handleChange}
                value={inputData.contact}
              />
              <br />
              <p className="mx-auto text-indigo-650">Change profile picture:</p>
              <input
                className="input bg-white"
                type="file"
                id="img"
                name="avatarImage"
                accept="image/*"
                onChange={e => setprofileImg(e.target.files[0])}
              />
              <textarea
                className="input p-2"
                name="about"
                rows="4"
                placeholder="About yourself (50 words)"
                value={inputData.about}
                onChange={handleChange}
              ></textarea>
              <br />
              <button className="submit-btn" onClick={handleSubmit}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
