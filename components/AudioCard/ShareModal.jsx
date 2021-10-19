import React, { useEffect, useRef, useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { useAuth } from '../../controllers/auth';

function ShareModal({ id, shareCount, setShow }) {
  const { userid } = useAuth();
  const modal = useRef();

  //   useEffect(() => {
  // window.onclick = function (event) {
  // console.log(event.target,modal.current)
  //   if (event.target !== modal.current) {
  //     modal.current.style.display = 'none';
  //     console.log('modal close');
  // }
  // setShow(false);
  // };
  //   }, []);

  function openModal() {
    if (userid) {
      //   modal.current.style.display = 'block';
      const elem = document.getElementById(`modal-${id}`);
      elem.classList.toggle('hidden');
      //   console.log('modal open');
      //   setShow(true);
    } else {
      Router.push('/login');
    }
  }

  return (
    <div>
      <button id={`open-btn-${id}`} onClick={openModal}>
        <div className="flex items-center">
          <FaShareAlt className="audio-card__action--item" />
          <span className="audio-card__action--item">{shareCount}</span>
        </div>
      </button>
    </div>
  );
}

export default ShareModal;
