import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import avatar from '../../assets/Avatar.png';
import axios from 'axios';
import { useAuth } from '../../controllers/auth';

const myProfile = () => {
  const [inputData, setInputData] = useState({
    creatorName: '',
    contact: '',
    email: '',
    about: '',
  });
  const [imgSrc, setImgSrc] = useState(avatar.src);

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

  const handleChange = e => {
    const { name, value } = e.target;
    setInputData(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <>
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
          <form
            action="/api/updateUserProfile"
            method="POST"
            encType="multipart/form-data"
            className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
          >
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
            <input type="hidden" name="email" value={inputData.email} />
            <button className="submit-btn" type="submit">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default myProfile;