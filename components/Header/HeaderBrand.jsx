import { useRouter } from 'next/router';
import React from 'react';
import { BsFillMicFill } from 'react-icons/bs';
import micLogo from '../../assets/MicLogo.svg';
import titleLogo from '../../assets/TitleLogo.svg';

const HeaderBrand = () => {
  const router = useRouter();
  function handleClick() {
    router.push('/');
  }
  return (
    <div
      className="flex justify-center items-center px-2 py-1 text-3xl cursor-pointer"
      onClick={handleClick}
    >
      <span className="text-indigo-650">
        <BsFillMicFill />
      </span>
      <span className="text-indigo-650 font-bold">Radyo.ai</span>
      {/* <img src={micLogo.src} alt="logo" className="max-h-8 max-w-8" />
      <img
        src={titleLogo.src}
        alt="brand"
        className="max-h-14 max-w-24 -mb-2 -ml-4"
      /> */}
    </div>
  );
};

export default HeaderBrand;
