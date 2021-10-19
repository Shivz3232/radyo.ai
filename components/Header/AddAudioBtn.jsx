import React, { useState } from 'react';
import Link from 'next/link';
import { BsFillMicFill } from 'react-icons/bs';
// import addAudio from '../../assets/add_audio.png';
import addAudio from '../../assets/addaudio_icon1.png';
// import addAudio from '../../assets/addaudio_mobile.svg';
const AddAudioBtn = ({ customStyles, hideText, iconSize }) => {
  return (
    <Link href="/user/addAudio" passHref>
      <button
        className={`flex items-center  rounded-full ${customStyles} ${
          hideText ? '' : 'px-2 py-1 border border-indigo-650 bg-indigo-650'
        } text-sm text-white hover:bg-white hover:text-indigo-650 transition delay-75 ease-in-out`}
      >
        {!hideText ? <span className={`mr-1`}>Add +</span> : null}
        <span>
          {/* <BsFillMicFill color="white" /> */}
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
