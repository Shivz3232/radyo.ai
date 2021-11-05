import { decode } from 'html-entities';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillPlayCircle, AiOutlineClose } from 'react-icons/ai';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import LinesEllipsis from 'react-lines-ellipsis';
import playButton from '../../assets/playbtn.png';
import { FACEBOOK_APP_ID } from '../../constants';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import ShareModalBtn from '../AudioCard/ShareModalBtn';
import { FaFacebook } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import axios from 'axios';
import { useAuth } from '../../controllers/auth';
import Router from 'next/router';
import { MdContentCopy } from 'react-icons/md';
import { FcCheckmark } from 'react-icons/fc';
import vinylRecord from '../../assets/vinylRecord.svg';

const PlaylistCard = ({ cardItemData, categoryName, origin }) => {
  cardItemData['category'] = 'Playlist';
  const { setContextPlaylist } = usePlaylist();
  const { userid } = useAuth();
  const trackInfo = {
    coverSrc: '/lovebytes/images/vinylRecord.svg',
    audioSrc: cardItemData.podcastList[0].audioSrc,
    title: cardItemData.podcastList[0].title,
  };

  const { playAudio, updatePlaylistCount } = usePlaylist();
  const { category, title, playCount, shareCount } = cardItemData;
  const creatorId = cardItemData.creatorId.uid;
  const creatorName = cardItemData.creatorId.creatorName;

  useEffect(() => {
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
      .post(`/api/update_share_count/${cardItemData._id}`, {
        collection: 'playlist',
      })
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
        collection: 'playlist',
      })
      .catch(err => console.log(err));
  };
  const unlikeAudio = () => {
    axios
      .post(`/api/update_like_count/${cardItemData._id}`, {
        action: 'unlike',
        userid: userid,
        collection: 'playlist',
      })
      .catch(err => console.log(err));
  };

  const getTelegramShareLink = () => {
    const url = encodeURIComponent(`${origin}/${cardItemData.shortId}`);
    const text = `Listen ${cardItemData.title} by ${cardItemData.creatorName} on Radyo.ai Click here to listen ${url}`;
    return `https://telegram.me/share/url?url=${url}&text=${text}`;
  };

  const getWhatsAppShareLink = () => {
    const url = `${origin}/${cardItemData.shortId}`;
    const text = `Listen ${cardItemData.title} by ${cardItemData.creatorName} on Radyo.ai Click here to listen ${url}`;
    return decode(`whatsapp://send?text=${text}`);
  };

  const getFacebookShareLink = () => {
    try {
      const url = encodeURIComponent(`${origin}/${cardItemData.shortId}`);
      const text = encodeURIComponent(
        `Listen ${cardItemData.title} by ${cardItemData.creatorName} on Radyo.ai Click here to listen ${url}`
      );
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=${FACEBOOK_APP_ID}`;
    } catch (error) {
      console.log('Window not defined');
    }
  };

  const copyToClipboard = e => {
    navigator.clipboard.writeText(`${origin}/${cardItemData.shortId}`);
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
              src={'/lovebytes/images/vinylRecord.svg'}
              alt="Love"
            />
            <img
              src={playButton.src}
              alt="play button"
              onClick={() => {
                setContextPlaylist(cardItemData.podcastList);
                updatePlaylistCount(cardItemData._id.toString());
                playAudio(trackInfo, cardItemData._id.toString());
              }}
              className="play__button"
            />
          </div>
          <div className="audio-card__header--items">
            <div className="audio-card__header--item audio-card__category playlist">
              Playlist
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
        </div>
      </div>
      <div
        className="z-30 fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id={`modal-${categoryName}-${cardItemData._id}`}
      >
        <div className="z-40 relative top-20 mx-auto p-5 border w-96 mobile:w-72 shadow-lg rounded-md bg-white">
          <button
            className="flex w-full justify-end"
            onClick={() => {
              const elem = document.getElementById(
                `modal-${categoryName}-${cardItemData._id}`
              );
              elem.classList.toggle('hidden');
              setCopy(false);
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
                src={'/lovebytes/images/vinylRecord.svg'}
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
              <div className="w-11/12 text-sm overflow-hidden">{`${origin}/${cardItemData.shortId}`}</div>
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

export default PlaylistCard;
