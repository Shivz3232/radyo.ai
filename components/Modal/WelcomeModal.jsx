import { React } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { session } from 'passport';

const WelcomeModal = props => {
  const [closingCounter, setclosingCounter] = useState(12);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (closingCounter == 1) {
        props.setshowWelcomeModal('hidden');
      } else {
        setclosingCounter(closingCounter - 1);
      }
    }, 1000);
  });

  return (
    <div
      className={
        'fixed pin flex items-center h-screen w-screen z-30 ' +
        props.showWelcomeModal
      }
    >
      <div className="p-5 pb-1 z-50 welcome_modal_bg z-30">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              props.setshowWelcomeModal('hidden');
            }}
          >
            <span className="mr-2 text-white">X</span>
          </button>
        </div>
        <div className="text-center text-4xl text-white leading-normal">
          Hey Buddy
        </div>
        <div className="text-center text-4xl text-white my-10 leading-normal">
          Radyo.ai welcomes you with latest trending audio.
          <br />
          Enjoy...
        </div>
        <div className="text-center text-2xl mt-10 mb-2">
          <button className="bg-white text-opacity-0 font-bold py-2 px-4 rounded-full">
            Play Now
          </button>
        </div>
        <div className="text-center text-sm text-white my-5">
          Closing in next {closingCounter} seconds...
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
