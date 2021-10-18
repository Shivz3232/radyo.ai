import { decode } from 'html-entities';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import LinesEllipsis from 'react-lines-ellipsis';
// import { Event } from '../Tracking/Tracking';
import playButton from '../../assets/playbtn.png';
import { FACEBOOK_APP_ID } from '../../constants';
// import { CgPlayListAdd, CgPlayListCheck } from 'react-icons/cg';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import ShareModal from './ShareModal';
import { FaFacebook } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import axios from 'axios';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const AudioCard = ({ cardItemData, categoryName, origin }) => {
  const trackInfo = {
    coverSrc: `${cardItemData.coverImage}`,
    audioSrc: cardItemData.audioSrc,
    title: cardItemData.title,
  };

  const { playAudio } = usePlaylist();
  // Destructuring the props item
  const {
    creatorId,
    creatorName,
    category,
    title,
    playCount,
    likeCount,
    shareCount,
    coverImage,
  } = cardItemData;

  const updateShareCount = () => {
    axios
      .post(`/api/update_share_count/${cardItemData._id}`, {})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const getTelegramShareLink = () => {
    const url = encodeURIComponent(`${origin}/audio/${cardItemData._id}`);
    const text = `${'Hear it on : '}`;
    return `https://telegram.me/share/url?url=${url}&text=${text}`;
  };

  const getWhatsAppShareLink = () => {
    const url = `${origin}/audio/${cardItemData._id}`;
    const text = `Hear it on :  ${url}`;
    return decode(`whatsapp://send?text=${text}`);
  };

  const getFacebookShareLink = () => {
    try {
      const url = encodeURIComponent(`${origin}/audio/${cardItemData._id}`);
      const text = encodeURIComponent(
        `${'Hear it on: '}${origin}/audio/${cardItemData._id}`
      );
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=${FACEBOOK_APP_ID}`;
    } catch (error) {
      console.log('Window not defined');
    }
  };

  return (
    <div>
      <div
        className="audio-card mini generic-card"
        id={`${categoryName}-${cardItemData._id}`}
      >
        <div className="audio-card__header">
          <div className="audio-card__header--image">
            <img
              className="audio-card__image"
              src={
                coverImage.length
                  ? coverImage
                  : '/lovebytes/images/Picture1.jpg'
              }
              alt="Love"
            />
            <img
              src={playButton.src}
              alt="play button"
              onClick={() => {
                playAudio(trackInfo, cardItemData._id.toString());
                // Event('Podcast', 'Play button clicked', cardItemData.title);
              }}
              className="play__button"
            />
          </div>
          <div className="audio-card__header--items">
            <div
              className={`audio-card__header--item audio-card__category ${category}`}
            >
              {capitalizeFirstLetter(category)}
            </div>
            <Link href={`/audio/${cardItemData._id}`}>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="audio-card__header--item audio-card__title">
                  <LinesEllipsis
                    text={decode(title)}
                    maxLine="2"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </div>
              </a>
            </Link>
            <div className="audio-card__header--item audio-card__author">
              By:{creatorName}
            </div>
          </div>
        </div>
        <div className="audio-card__action--row">
          <div className="audio-card__action">
            <AiFillPlayCircle className="audio-card__action--item" />
            <span className="audio-card__action--item">{playCount}</span>
          </div>
          <div className="audio-card__action">
            <FaHeart className="audio-card__action--item" />
            <span className="audio-card__action--item">{likeCount}</span>
          </div>
          <div className="audio-card__action">
            <ShareModal
              id={`${categoryName}-${cardItemData._id}`}
              shareCount={shareCount}
            />
          </div>
          {/* <div className="audio-card__action">
          <CgPlayListAdd
            fontSize="1.65rem"
            className="audio-card__action--item"
          />
        </div> */}
        </div>
      </div>
      {/* modal content */}
      <div
        className="z-30 fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id={`modal-${categoryName}-${cardItemData._id}`}
        // ref={modal}
      >
        <div className="z-40 relative top-20 mx-auto p-5 border w-96 mobile:w-72 shadow-lg rounded-md bg-white">
          <button
            className="flex w-full justify-end"
            onClick={() => {
              // console.log(cardItemData);
              const elem = document.getElementById(
                `modal-${categoryName}-${cardItemData._id}`
              );
              elem.classList.toggle('hidden');
              // console.log('close');
            }}
          >
            <AiOutlineClose />
          </button>
          <div className="text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Share audio with friends
            </h3>
            <div className="flex mt-4 justify-evenly">
              <div className="h-8 w-8 mx-1" onClick={updateShareCount}>
                <a
                  href={getFacebookShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size="small" color="#4267B2" />
                </a>
              </div>
              <div className="h-8 w-8 mx-1" onClick={updateShareCount}>
                <a
                  href={getTelegramShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logoTelegram.src} alt="Share on Telegram" />
                </a>
              </div>
              <div className="h-8 w-8 mx-1" onClick={updateShareCount}>
                <a
                  href={getWhatsAppShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logoWhatsapp.src} alt="Share on Whatsapp" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
