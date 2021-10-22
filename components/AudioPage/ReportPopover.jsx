import axios from 'axios';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FiFlag } from 'react-icons/fi';
import { useAuth } from '../../controllers/auth';

function ReportPopover({ data, setReport }) {
  const { userid } = useAuth();
  const [reportText, setReportText] = useState('');

  function handleChange(e) {
    setReportText(e.target.value);
  }
  const modal = useRef();
  try {
    window.onclick = function (event) {
      if (event.target == modal.current) {
        modal.current.style.display = 'none';
      }
    };
  } catch (err) {
    console.log('window undefined');
  }

  function openModal() {
    if (userid) {
      modal.current.style.display = 'block';
    } else {
      Router.push('/login');
    }
  }

  function reportAudio(e) {
    e.preventDefault();
    modal.current.style.display = 'none';
    setReportText('');
    // console.log(data._id);
    if (userid)
      axios
        .post(`/api/reportAudio`, {
          audioId: data._id,
          report: { reportText: reportText, userId: userid },
        })
        .then(res => {
          // console.log(res);
          setReport(true);
          alert('Audio has been reported successfully');
        })
        .catch(console.error);
  }
  return (
    <>
      <div className="w-full">
        <button id="open-btn" onClick={openModal} className="has-tooltip">
          <span className="hidden md:inline tooltip bottom-full w-max text-white bg-gray-700 p-1 rounded-sm text-sm shadow">
            Report this audio
          </span>
          <FiFlag className="audioPage-card__action--item" />
        </button>
        <div
          className="z-30 fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
          ref={modal}
        >
          {/* <!--modal content--> */}
          <div className="z-40 relative top-20 mx-auto p-5 border w-96 mobile:w-72 shadow-lg rounded-md bg-white">
            <button
              className="flex w-full justify-end"
              onClick={() => {
                modal.current.style.display = 'none';
                setReportText('');
              }}
            >
              <AiOutlineClose />
            </button>
            <div className="text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Report the audio
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Tell us why you want to report the audio :
                </p>
              </div>
              <form onSubmit={reportAudio}>
                <div className="px-2 py-3">
                  <textarea
                    className="w-full border-2 border-grey-500 rounded-md px-3 py-2 focus:outline-none"
                    type="text"
                    onChange={handleChange}
                    value={reportText}
                    placeholder="specify reason"
                  />
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    id="ok-btn"
                    type="submit"
                    className="px-4 py-2 border border-red-500 bg-white text-red-600 text-base font-medium rounded-md w-full shadow-sm hover:text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 transition ease-in-out delay-75"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportPopover;
