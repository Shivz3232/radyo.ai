import React from 'react';
import { FaShareAlt } from 'react-icons/fa';

function ShareModalBtn({ id, shareCount }) {
  function openModal() {
    const elem = document.getElementById(`modal-${id}`);
    elem.classList.toggle('hidden');
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

export default ShareModalBtn;
