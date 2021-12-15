import axios from 'axios';
import { decode } from 'html-entities';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaFacebook, FaHeart, FaRegHeart } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import { FACEBOOK_APP_ID } from '../../constants';
import { useAuth } from '../../controllers/auth';
import { usePlaylist } from '../../controllers/PlaylistProvider';

const PlaylistPageComponent = ({ data }) => {
  const { userid } = useAuth();
  const { setContextPlaylist, playAudio } = usePlaylist();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [origin, setOrigin] = useState();
  const trackInfo = {
    coverSrc: data.podcastList[0].coverImage,
    audioSrc: data.podcastList[0].audioSrc,
    title: data.podcastList[0].title,
  };

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const updateShareCount = () => {
    axios
      .post(`/api/update_share_count/${data._id}`, {})
      .catch(err => console.log(err));
  };

  const getTelegramShareLink = () => {
    const url = encodeURIComponent(`${origin}/${data.shortId}`);
    const text = `Hear ${data.title} on Radyo.ai ${url}`;
    return `https://telegram.me/share/url?url=${url}&text=${text}`;
  };

  const getWhatsAppShareLink = () => {
    const url = `${origin}/${data.shortId}`;
    const text = `Hear ${data.title} on Radyo.ai ${url}`;
    return decode(`whatsapp://send?text=${text}`);
  };

  const getFacebookShareLink = () => {
    try {
      const url = encodeURIComponent(`${origin}/${data.shortId}`);
      const text = encodeURIComponent(`Hear ${data.title} on Radyo.ai ${url}`);
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=${FACEBOOK_APP_ID}`;
    } catch (error) {
      console.log('Window not defined');
    }
  };

  useEffect(() => {
    if (userid) {
      data.likedBy.forEach(elem => {
        if (elem.userId === userid) {
          setLike(true);
          return;
        }
      });
    }
  }, [data.likedBy, userid]);

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
      .post(`/api/update_like_count/${data._id}`, {
        collection: 'playlist',
        action: 'like',
        userid: userid,
      })
      .catch(err => console.log(err));
  };
  const unlikeAudio = () => {
    axios
      .post(`/api/update_like_count/${data._id}`, {
        collection: 'playlist',
        action: 'unlike',
        userid: userid,
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="audioPage-card mini generic-card">
        <div className={`audioPage-card__category ${data.category}`}>
          Playlist
        </div>

        <div className="audioPage-card__header">
          <div className="audioPage-card__header--items">
            <div className="audioPage-card__header--item audioPage-card__title">
              {data.title}
            </div>
            <Link href={`/creator/${data.creatorId.uid}`}>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="audioPage-card__header--item audioPage-card__author">
                  By : {data.creatorId.creatorName}
                </div>
              </a>
            </Link>
          </div>

          <div className="audioPage-card__header--image">
            <img
              className="playlistPage-card__roundedimage"
              src={'/lovebytes/images/vinylRecord.svg'}
              alt="Love"
            />
          </div>
        </div>

        <div className="audioPage-card__action--row">
          <div className="audioPage-card__action">
            <div className="audioPage-card__action--item">
              Played {data.playCount} times
            </div>
          </div>
          <div className="audioPage-card__action" onClick={updateLikeCount}>
            {like ? (
              <FaHeart className="audio-card__action--item" />
            ) : (
              <FaRegHeart className=" audio-card__action--item" />
            )}
            <span className="audioPage-card__action--item">{likeCount}</span>
          </div>
        </div>
      </div>
      <div className="button-row">
        <button
          className="play-btn"
          onClick={() => {
            playAudio(trackInfo, data._id.toString());
            setContextPlaylist(data.podcastList);
          }}
        >
          Play Now
        </button>
        <div className="share-btn flex border rounded p-2 mb-2">
          <div className="mx-1">Share with Friends</div>
          <div className="flex">
            <div className="h-8 w-8 mx-1" onClick={updateShareCount}>
              <a href={getFacebookShareLink()} target="_blank" rel="noreferrer">
                <FaFacebook size="small" color="#4267B2" />
              </a>
            </div>
            <div className="h-8 w-8 mx-1" onClick={updateShareCount}>
              <a href={getTelegramShareLink()} target="_blank" rel="noreferrer">
                <img src={logoTelegram.src} alt="Share on Telegram" />
              </a>
            </div>
            <div className="h-8 w-8 mx-1" onClick={updateShareCount}>
              <a href={getWhatsAppShareLink()} target="_blank" rel="noreferrer">
                <img src={logoWhatsapp.src} alt="Share on Whatsapp" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8"></div>
    </>
  );
};

export default PlaylistPageComponent;
