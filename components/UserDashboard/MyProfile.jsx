import React, { useState } from 'react';

const myProfile = () => {
  const [inputData, setInputData] = useState({
    fullName: '',
    userId: '',
    contact: '',
    email: '',
    about: '',
  });

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
      <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
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
            name="fullName"
            placeholder="Full name"
            onChange={handleChange}
            value={inputData.fullName}
            required
          />
          <br />
          <input
            className="input"
            type="text"
            name="userId"
            placeholder="User ID"
            onChange={handleChange}
            value={inputData.userId}
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
