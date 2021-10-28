import { useRouter } from 'next/router';
import React from 'react';
import { BsFillMicFill } from 'react-icons/bs';
import micLogo from '../../assets/radyologo.svg';
import titleLogo from '../../assets/TitleLogo.svg';

const HeaderBrand = () => {
  const router = useRouter();
  function handleClick() {
    router.push('/');
  }
  return (
    <div
      className="flex justify-center items-baseline px-2 py-1 text-3xl cursor-pointer"
      onClick={handleClick}
    >
      <img src={micLogo.src} alt="logo" className="max-h-8 max-w-8 mr-2" />
      <span className=" max-w-8 mr-2 text-transparent bg-indigo-650 bg-clip-text font-bold">
        Radyo.ai
      </span>
    </div>
  );
};

export default HeaderBrand;
