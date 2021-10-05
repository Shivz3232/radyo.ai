import React from 'react';
import Select from 'react-select';
import RecordAudio from '../RecordAudio/RecordAudio';

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
      <div className="text-indigo-650 flex flex-column w-11/12 sm:w-3/6 mx-auto p-6 bg-gray-300 rounded-md shadow-xl">
        <form
          action=""
          className="space-y-3 mx-auto text-gray-900 w-11/12 lg:w-4/6"
        >
          <p className="text-center text-indigo-650 text-lg">
            Share your talent, have fun, win prizes, get a fan following​!
          </p>
          <p className="mx-auto text-indigo-650 text-md">
            Select Category :
          </p>
          <Select
            className="border-2 border-indigo-650 rounded-md focus:ring-1 focus:ring-indigo-650"
            options={CatOptions}
          />
          <p className="mx-auto text-indigo-650 text-md">
            Select Language :
          </p>
          <Select
            className="border-2 border-indigo-650 rounded-md focus:ring-1 focus:ring-indigo-650"
            options={LanOptions}
          />
          <input
            className="input"
            type="text"
            name="Title"
            placeholder="Enter title of the submission (max 10 words)​"
          />
          <br />
          <input
            className="input"
            type="text"
            name="hastags"
            placeholder="Enter comma separate keywords, hashtags​"
          />
          <br />
          <hr className="border-0 border-b-2 border-indigo-650 mx-auto h-2 w-36" />
          <RecordAudio />
          <hr className="border-0 border-b-2 border-indigo-650 mx-auto h-2 w-36" />
          <p className="mx-auto text-indigo-650">
            Upload cover photo of the audio:
          </p>
          <input
            className="input bg-white"
            type="file"
            id="img"
            name="img"
            accept="image/*"
          />
          <button
            className="submit-btn"
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
