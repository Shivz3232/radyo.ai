import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import avatar from '../../assets/Avatar.png';
import axios from 'axios';

const myProfile = () => {
  const [inputData, setInputData] = useState({
    creatorName: '',
    contact: '',
    email: '',
    about: '',
  });
  const [imgSrc, setImgSrc] = useState(avatar.src)

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
              contact: '',
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
    }, 3000);
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
      <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-white rounded-md shadow-xl">
        <div className="flex flex-column items-center cursor-pointer">
          <img
            src={imgSrc}
            alt="avatar"
            className="h-12 w-12 rounded-full bg-gray-200 align-middle block"
          />
        </div>
        <form
          action="/api/userProfile"
          method="POST"
          encType="multipart/form-data"
          className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
        >
          <p className="text-center text-indigo-650 text-lg">
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
          <br />
          <input
            className="input"
            type="tel"
            pattern="[0-9]{10}"
            name="contact"
            placeholder="Contact number"
            onChange={handleChange}
            value={inputData.contact}
            required
          />
          <br />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email id"
            onChange={handleChange}
            value={inputData.email}
            required
          />
          <br />
          <p className="mx-auto text-indigo-650">
            Upload your profile picture:
          </p>
          <input
            className="input bg-white"
            type="file"
            id="img"
            name="profile_img"
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
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default myProfile;

//  <input
//   className="input"
//   type="text"
//   name="uid"
//   placeholder="User ID"
//   onChange={handleChange}
//   value={inputData.uid}
//   required
// /> 