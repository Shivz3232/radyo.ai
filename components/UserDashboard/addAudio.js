import React, { Component } from 'react';
import Select from 'react-select';
import RecordAudio from '../RecordAudio/recordAudio';

const addAudio = () => {

  const CatOptions = [
    { value: 'Cat1', label: 'Category 1' },
    { value: 'Cat2', label: 'Category 2' },
    { value: 'Cat3', label: 'Category 3' },
  ];

  const LanOptions = [
    { value: 'eng', label: 'English' },
    { value: 'hin', label: 'Hindi' },
  ];

  return (
    <>
      <div className="text-indigo-600 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
        <form
          action=""
          className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
        >
          <p className="text-center text-indigo-600 text-lg font-semibold">
            Share your talent, have fun, win prizes, get a fan following​!
          </p>
          <p className="mx-auto text-indigo-600 text-md font-semibold">
            Select Category :
          </p>
          <Select
            className="border-2 border-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600"
            options={CatOptions}
          />
          <p className="mx-auto text-indigo-600 text-md font-semibold">
            Select Language :
          </p>
          <Select
            className="border-2 border-indigo-600 rounded-md focus:ring-1 focus:ring-indigo-600"
            options={LanOptions}
          />
          <input
            className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            type="text"
            name="Title"
            placeholder="Enter title of the submission (max 10 words)​"
          />
          <br />
          <input
            className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            type="text"
            name="hastags"
            placeholder="Enter comma separate keywords, hashtags​"
          />
          <br />
          <hr className="border-0 border-b-2 border-indigo-600 mx-auto h-2 w-36" />
          <RecordAudio />
          <hr className="border-0 border-b-2 border-indigo-600 mx-auto h-2 w-36" />
          <p className="mx-auto text-indigo-600 font-semibold">
            Upload cover photo of the audio:
          </p>
          <input
            className="w-full bg-white border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            type="file"
            id="img"
            name="img"
            accept="image/*"
          />
          <button
            className="px-5 py-2 shadow-lg bg-indigo-600 text-white rounded-md uppercase tracking-wider font-semibold text-sm"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default addAudio;


{/* <select
            className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            name="cars"
            id="cars"
          >
            <option value="">Select Category</option>
            <option value="Cat1">Category 1</option>
            <option value="Cat2">Category 2</option>
            <option value="Cat3">Category 3</option>
          </select>
          <select
            className="w-full border-2 border-indigo-600 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            name="cars"
            id="cars"
          >
            <option value="">Select Language</option>
            <option value="Cat1">English</option>
            <option value="Cat2">Hindi</option>
          </select> */}
