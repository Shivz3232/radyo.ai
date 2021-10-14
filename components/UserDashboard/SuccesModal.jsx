import React from 'react';
import { GoVerified } from 'react-icons/go';

const SuccessModal = ({ message, close }) => {
  return (
    <>
      <div className="w-full">
        <div
          className="z-30 fixed block inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="succes-modal"
        >
          {/* <!--modal content--> */}
          <div className="z-40 relative top-20 mx-auto p-5 border w-96 mobile:w-72 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              {message.msg ? (
                <>
                  <h1>
                    <GoVerified className="text-green-500 text-5xl mx-auto mb-3" />
                  </h1>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-8">
                    {message.msg}
                  </h3>
                  <button
                    type="button"
                    className="border border-indigo-650 bg-indigo-650 text-white text-base font-medium rounded-full py-3 px-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-white transition ease-in-out delay-75"
                    onClick={close}
                  >
                    Continue
                  </button>
                </>
              ) : (
                <div className=" flex flex-col justify-center items-center z-40">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                  <div className="text-gray-900 text-lg mt-3">
                    {message.savingMsg}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
