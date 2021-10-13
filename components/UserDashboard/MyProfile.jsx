import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import avatar from '../../assets/Avatar.png';
import axios from 'axios';
import { image_formats } from '../RecordAudio/fileFormats';
import SuccessModal from './succesModal';
import { useRouter } from 'next/router';

const MyProfile = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    creatorName: '',
    contact: '',
    email: '',
    about: '',
  });
  const [imgSrc, setImgSrc] = useState(avatar.src);
  const [profileImg, setprofileImg] = useState('');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    // try {
    //   const user = firebase.auth().currentUser;
    //   console.log(user);
    // } catch (error) {
    //   console.log(error);
    // }

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
            };
            setInputData(userData);
            setImgSrc(details.avatarImage);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, 1000);
  }, []);

  const handleSubmit = async e => {
    // e.preventDefault();

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

    await axios({
      method: 'post',
      url: '/api/updateUserProfile',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        if (response.status === 200) {
          setSubmit(true);
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
  }

  return (
    <>
      {submit && (
        <SuccessModal message="Congratulations, your profile has been successfully updated!" close={handleClose}/>
      )}
      <div className="h-screen">
        <div className="text-indigo-650 w-11/12 sm:w-3/6 mx-auto p-6 pt-3 bg-white rounded-md shadow-xl">
          <div className="mx-auto mb-5 hover:scale-105 transform transition max-w-xs">
            <img
              src={imgSrc}
              alt="avatar"
              className="h-20 w-20 rounded-full mx-auto bg-gray-200 align-middle block"
            />
            <p className="text-center text-gray-900">{inputData.email}</p>
          </div>
          <div>
            <div className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6">
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
