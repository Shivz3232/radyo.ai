import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { MdContentCopy } from 'react-icons/md';
import { FACEBOOK_APP_ID } from '../../constants';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import { decode } from 'html-entities';
import { useRouter } from 'next/router';
import axios from 'axios';
const CreatorCard = ({
  data,
  creatorPlaylist,
  userid,
  following,
  setFollowing,
  followers,
  setFollowers,
}) => {
  const router = useRouter();
  const { playAudio, setContextPlaylist } = usePlaylist();
  const [copy, setCopy] = useState(false);
  const [origin, setOrigin] = useState();
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  function playAll() {
    setContextPlaylist(creatorPlaylist);
    playAudio(
      {
        audioSrc: creatorPlaylist[0].audioSrc,
        coverSrc: creatorPlaylist[0].coverImage,
        title: creatorPlaylist[0].title,
      },
      creatorPlaylist[0]._id
    );
  }

  const getTelegramShareLink = () => {
    const url = encodeURIComponent(`${origin}/creator/${data.uid}`);
    const text = `Check out wonderful creations from ${data.creatorName} on Radyo.ai Click here ${url}`;
    return `https://telegram.me/share/url?url=${url}&text=${text}`;
  };

  const getWhatsAppShareLink = () => {
    const url = `${origin}/creator/${data.uid}`;
    const text = `Check out wonderful creations from ${data.creatorName} on Radyo.ai Click here ${url}`;
    return decode(`whatsapp://send?text=${text}`);
  };

  const getFacebookShareLink = () => {
    try {
      const url = encodeURIComponent(`${origin}/creator/${data.uid}`);
      const text = encodeURIComponent(
        `Check out wonderful creations from ${data.creatorName} on Radyo.ai Click here ${url}`
      );
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=${FACEBOOK_APP_ID}`;
    } catch (error) {
      console.log('Window not defined');
    }
  };

  const copyToClipboard = e => {
    navigator.clipboard.writeText(`${origin}/creator/${data.uid}`);
    setCopy(true);
  };

  const followCreator = async (
    creatorId,
    setFollowing,
    following,
    setFollowers
  ) => {
    const action = !following ? 'FOLLOW' : 'UNFOLLOW';
    const data = {
      creatorId: creatorId,
      action: action,
    };

    await axios({
      method: 'post',
      url: '/api/updateFollowers',
      data: data,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (action === 'FOLLOW') {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
        setFollowers(res.data.followers);
      })
      .catch(error => {});
  };

  return (
    <>
      <div className="creator-card mini generic-card">
        {/* on mobile hide this and use different layout */}
        <div className="mobile:hidden creator-card--image">
          <img
            className="creator-card__roundedimage"
            src={
              data && data.avatarImage
                ? data.avatarImage
                : '/lovebytes/images/Picture1.jpg'
            }
            alt="Love"
          />
        </div>
        <div className="mobile:hidden creator-card__header">
          <div className="creator-card__header--items">
            <div className="creator-card__header--item creator-card__author">
              {data && data.creatorName}
            </div>
            {
              <div
                className={`creator-card__header--item creator-card__aboutme ${
                  data && data.about.length ? '' : 'text-gray-400'
                }`}
              >
                {data && data.about.length ? data.about : 'About the creator'}
              </div>
            }
          </div>
        </div>
        {/* layout for mobile */}
        <div className="hidden mobile:block p-4 w-full">
          <div className="flex items-center justify-start">
            <div className="flex items-center justify-center w-36">
              <img
                className="rounded-md"
                src={
                  data && data.avatarImage
                    ? data.avatarImage
                    : '/lovebytes/images/Picture1.jpg'
                }
                alt="avatar"
              />
            </div>
            <div className="ml-4 text-xl font-bold">
              {data && data.creatorName}
            </div>
          </div>
          {data && data.about.length ? (
            <div className="mt-2 border border-indigo-650 rounded-md p-2 text-base">
              {data.about}
            </div>
          ) : null}
        </div>
      </div>

      <div className="creatorCard__action--row">
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data && data.audiosPublished}
          </span>
          <span className="creator-card__action--item">Audios</span>
        </div>
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data && data.playCount}
          </span>
          <span className="creator-card__action--item"> Plays</span>
        </div>
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data && followers.length}
          </span>
          <span className="creator-card__action--item">Followers</span>
        </div>
      </div>

      <div className="button-container">
        <button className="playButton" onClick={playAll}>
          Play All
        </button>

        <button
          className="fsButton"
          onClick={() => {
            if (!userid) {
              router.push('/login');
            } else {
              followCreator(
                data.uid,
                setFollowing,
                following,
                setFollowers,
                userid
              );
            }
          }}
        >
          {(!following && 'Follow') || 'Unfollow'}
        </button>

        <button
          className="shareButton"
          onClick={() => {
            const elem = document.getElementById(`${data._id}`);
            elem.classList.toggle('hidden');
          }}
        >
          Share
        </button>
      </div>
      {/* modal content */}
      <div
        className="z-30 fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id={`${data._id}`}
        // ref={modal}
      >
        <div className="z-40 relative top-20 mx-auto p-5 border w-96 mobile:w-72 shadow-lg rounded-md bg-white">
          <button
            className="flex w-full justify-end"
            onClick={() => {
              // console.log(cardItemData);
              const elem = document.getElementById(`${data._id}`);
              elem.classList.toggle('hidden');
              setCopy(false);
              // console.log('close');
            }}
          >
            <AiOutlineClose />
          </button>
          <div className="text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Share this page with friends
            </h3>
            <div className="w-full flex items-center justify-center flex-col mt-3">
              <img
                className="h-24 w-24 object-fit shadow border"
                src={
                  data && data.avatarImage
                    ? data.avatarImage
                    : '/lovebytes/images/Picture1.jpg'
                }
                alt="avatar"
              />
              <div className="mt-3">{data.creatorName}</div>
            </div>
            <div className="flex mt-4 justify-evenly w-4/5 mx-auto">
              <div className="h-11 w-11  mobile:h-9 mobile:w-9">
                <a
                  href={getFacebookShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook size="small" color="#4267B2" />
                </a>
              </div>
              <div className="h-11 w-11  mobile:h-9 mobile:w-9">
                <a
                  href={getTelegramShareLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logoTelegram.src} alt="Share on Telegram" />
                </a>
              </div>
              <div className="h-11 w-11 mobile:h-9 mobile:w-9">
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
              <div className="w-11/12 text-sm overflow-hidden">{`${origin}/creator/${data.uid}`}</div>
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
    </>
  );
};

export default CreatorCard;
