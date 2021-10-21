import { decode } from 'html-entities';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import LinesEllipsis from 'react-lines-ellipsis';
// import { Event } from '../Tracking/Tracking';
import playButton from '../../assets/playbtn.png';
import { FACEBOOK_APP_ID } from '../../constants';
// import { CgPlayListAdd, CgPlayListCheck } from 'react-icons/cg';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import ShareModalBtn from './ShareModalBtn';
import { FaFacebook } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import axios from 'axios';
import { useAuth } from '../../controllers/auth';
import Router from 'next/router';
import { MdContentCopy } from 'react-icons/md';
import { FcCheckmark } from 'react-icons/fc';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const AudioCard = ({ cardItemData, categoryName, origin }) => {
  const { userid } = useAuth();
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
    shareCount,
    coverImage,
  } = cardItemData;

  useEffect(() => {
    // console.log(userid);
    if (userid) {
      cardItemData.likedBy.forEach((elem, i) => {
        if (elem.userId === userid) {
          setLike(true);
          return;
        }
      });
    }
  }, [cardItemData.likedBy, userid]);

  const [copy, setCopy] = useState(false);
  const updateShareCount = () => {
    axios
      .post(`/api/update_share_count/${cardItemData._id}`, {})
      // .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(cardItemData.likeCount);
  const updateLikeCount = () => {
    if (userid) {
      if (like) {
        unlikeAudio();
        setLikeCount(likeCount - 1);
      } else {
        likeAudio();
        setLikeCount(likeCount + 1);
      }
      setLike(!like);
    } else {
      Router.push('/login');
    }
  };
  const likeAudio = () => {
    axios
      .post(`/api/update_like_count/${cardItemData._id}`, {
        action: 'like',
        userid: userid,
      })
      // .then(res => console.log(res.data.updateCount))
      .catch(err => console.log(err));
  };
  const unlikeAudio = () => {
    axios
      .post(`/api/update_like_count/${cardItemData._id}`, {
        action: 'unlike',
        userid: userid,
      })
      // .then(res => console.log(res.data.updateCount))
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

  const copyToClipboard = e => {
    navigator.clipboard.writeText(`${origin}/audio/${cardItemData._id}`);
    updateShareCount();
    setCopy(true);
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
          <div className="audio-card__action" onClick={updateLikeCount}>
            {like ? (
              <FaHeart className="audio-card__action--item" />
            ) : (
              <FaRegHeart className=" audio-card__action--item" />
            )}
            <span className="audio-card__action--item">{likeCount}</span>
          </div>
          <div className="audio-card__action">
            <ShareModalBtn
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
              setCopy(false);
              // console.log('close');
            }}
          >
            <AiOutlineClose />
          </button>
          <div className="text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Share audio with friends
            </h3>
            <div className="w-full flex items-center justify-center flex-col mt-3">
              <img
                className="h-24 w-24 object-fit shadow border"
                src={
                  coverImage.length
                    ? coverImage
                    : '/lovebytes/images/Picture1.jpg'
                }
                alt="cover"
              />
              <div className="mt-3">{title}</div>
            </div>
            <div className="flex mt-4 justify-evenly w-4/5 mx-auto">
              <div
                className="h-11 w-11  mobile:h-9 mobile:w-9"
                onClick={updateShareCount}
              >
                <a
                  href={getFacebookShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size="small" color="#4267B2" />
                </a>
              </div>
              <div
                className="h-11 w-11  mobile:h-9 mobile:w-9"
                onClick={updateShareCount}
              >
                <a
                  href={getTelegramShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logoTelegram.src} alt="Share on Telegram" />
                </a>
              </div>
              <div
                className="h-11 w-11 mobile:h-9 mobile:w-9"
                onClick={updateShareCount}
              >
                <a
                  href={getWhatsAppShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logoWhatsapp.src} alt="Share on Whatsapp" />
                </a>
              </div>
            </div>
            <div
              className="mt-3 p-2 border bg-gray-200 rounded flex items-center justify-center"
              onClick={copyToClipboard}
            >
              <div className="w-11/12 text-sm overflow-hidden">{`${origin}/audio/${cardItemData._id}`}</div>
              <div className="pl-2 text-gray-600 cursor-pointer has-tooltip">
                <span className="hidden md:inline tooltip bottom-full w-max text-white bg-gray-700 p-1 rounded-sm text-sm shadow">
                  {copy ? 'Copied' : 'Copy link'}
                </span>
                {copy ? <FcCheckmark /> : <MdContentCopy />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
