import React, { useState } from 'react';
import Link from 'next/link';
import addAudio from '../../assets/addaudio_icon1.png';
const AddAudioBtn = ({ customStyles, hideText, iconSize }) => {
  return (
    <Link href="/user/addAudio" passHref>
      <button
        className={`flex items-center  rounded-full ${customStyles} ${
          hideText
            ? ''
            : 'px-2 py-1 bg-gradient-to-l from-indigo-650 to-indigo-600'
        } text-sm text-white hover:text-indigo-100 hover:shadow-2xl transition delay-75 ease-in-out`}
      >
        {!hideText ? <span className={`mr-1`}>Add +</span> : null}
        <span>
          <img
            src={addAudio.src}
            className={`${iconSize ? iconSize : 'h-8'}`}
            alt="add"
          />
        </span>
      </button>
    </Link>
  );
};

export default AddAudioBtn;
