import React, { useState } from 'react';
import Link from 'next/link';
import { BsFillMicFill } from 'react-icons/bs';
const AddAudioBtn = ({ customStyles, size }) => {
  const [btnSize, setBtnSize] = useState(() => {
    if (size) {
      if (size === 'L') {
        return { padding: 'py-2 px-4', textSize: 'text-lg' };
      } else if (size === 'M') {
        return {};
      }
    } else return { padding: 'py-1.5 px-3' };
  });
  return (
    <Link href="/user/dashboard" passHref>
      <button
        className={`flex items-center border rounded-full ${customStyles} ${btnSize.padding} border-indigo-650 bg-indigo-650 text-white hover:bg-white hover:text-indigo-650 transition delay-75 ease-in-out`}
      >
        <span className={`mr-1 ${btnSize.textSize}`}>Add +</span>
        <span className={`rounded-full p-2 bg-red-700 ${btnSize.textSize}`}>
          <BsFillMicFill color="white" />
        </span>
      </button>
    </Link>
  );
};

export default AddAudioBtn;
