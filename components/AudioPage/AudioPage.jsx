import axios from 'axios';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { decode } from 'html-entities';
// import { Event } from '../Tracking/Tracking';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { Comments, FacebookProvider } from 'react-facebook';
import 'react-h5-audio-player/lib/styles.css';
import { FaFacebook, FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdOutlineReportProblem } from 'react-icons/md';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import { FACEBOOK_APP_ID } from '../../constants';
import { useAuth } from '../../controllers/auth';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import { capitalizeFirstLetter } from '../AudioCard/AudioCard';
import ReportPopover from './ReportPopover';

dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'seconds',
    m: 'a minute',
    mm: '%dmin',
    h: 'an hour',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

const AudioPageComponent = ({ data }) => {
  const { userid } = useAuth();
  const { playAudio } = usePlaylist();
  const [report, setReport] = useState(false);
  useEffect(() => {
    if (userid) {
      data.reportedBy.forEach(e => {
        if (e.userId === userid) {
          setReport(true);
          return;
        }
      });
    }
  }, [data.reportedBy, userid]);

  const trackInfo = {
    coverSrc: data.coverImage,
    audioSrc: data.audioSrc,
    title: data.title,
  };
  const [origin, setOrigin] = useState();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  // console.log('Trackinfo in audiopage component:', trackInfo);

  const updateShareCount = () => {
    axios
      .post(`/api/update_share_count/${data._id}`, {})
      // .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const getTelegramShareLink = () => {
    const url = encodeURIComponent(`${origin}/audio/${data._id}`);
    const text = `${'Hear it on : '}`;
    return `https://telegram.me/share/url?url=${url}&text=${text}`;
  };

  const getWhatsAppShareLink = () => {
    const url = `${origin}/audio/${data._id}`;
    const text = `Hear it on :  ${url}`;
    return decode(`whatsapp://send?text=${text}`);
  };

  const getFacebookShareLink = () => {
    try {
      const url = encodeURIComponent(`${origin}/audio/${data._id}`);
      const text = encodeURIComponent(
        `${'Hear it on: '}${origin}/audio/${data._id}`
      );
      return `https://www.facebook.com/sharer/sharer.php?u=${url}&display=popup&ref=plugin&src=like&kid_directed_site=0&app_id=${FACEBOOK_APP_ID}`;
    } catch (error) {
      console.log('Window not defined');
    }
  };

  useEffect(() => {
    // console.log(userid);
    if (userid) {
      data.likedBy.forEach(elem => {
        if (elem.userId === userid) {
          setLike(true);
          return;
        }
      });
    }
  }, [data.likedBy, userid]);

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(data.likeCount);
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
        action: 'like',
        userid: userid,
      })
      // .then(res => console.log(res.data.updateCount))
      .catch(err => console.log(err));
  };
  const unlikeAudio = () => {
    axios
      .post(`/api/update_like_count/${data._id}`, {
        action: 'unlike',
        userid: userid,
      })
      // .then(res => console.log(res.data.updateCount))
      .catch(err => console.log(err));
  };

  return (
    <>
      {/*AudioCard*/}
      <div className="audioPage-card mini generic-card">
        <div className={`audioPage-card__category ${data.category}`}>
          {capitalizeFirstLetter(data.category)}
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
              className="audioPage-card__roundedimage"
              src={
                data.coverImage
                  ? data.coverImage
                  : '/lovebytes/images/Picture1.jpg'
              }
              alt="Love"
            />
          </div>
        </div>

        <div className="audioPage-card__action--row">
          <div className="audioPage-card__action">
            <span className="audioPage-card__action--item">
              Played {data.playCount} times
            </span>
          </div>
          <div className="audioPage-card__action" onClick={updateLikeCount}>
            {like ? (
              <FaHeart className="audio-card__action--item" />
            ) : (
              <FaRegHeart className=" audio-card__action--item" />
            )}
            <span className="audioPage-card__action--item">
              {data.likeCount}
            </span>
          </div>
          <div className="audioPage-card__action">
            <span className="audioPage-card__action--item">
              {dayjs().to(dayjs(data.createdAt))}
            </span>
          </div>
          <div className="audioPage-card__action has-tooltip">
            {report ? (
              <>
                <span className="hidden md:inline tooltip bottom-full w-max text-white bg-gray-700 p-1 rounded-sm text-sm shadow">
                  Audio has been reported
                </span>
                <MdOutlineReportProblem className="text-red-500 audioPage-card__action--item" />
              </>
            ) : (
              <ReportPopover data={data} setReport={setReport} />
            )}
          </div>
        </div>
      </div>
      {data.tags.length > 0 ? (
        <div className="tags-row">
          {data.tags.map((elem, i) => (
            <div key={i} className="tag-item bg-indigo-650">
              {elem}
            </div>
          ))}
        </div>
      ) : null}
      {/*Button Row*/}
      <div className="button-row">
        <button
          className="play-btn"
          onClick={() => {
            playAudio(trackInfo, data._id.toString());
            // Event('Audio', 'Play button clicked', data.title);
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

      {/*Comment Box*/}
      <div className="comment-box-container">
        <FacebookProvider appId={FACEBOOK_APP_ID}>
          <Comments href="http://www.facebook.com" width="100%" />
        </FacebookProvider>
      </div>
    </>
  );
};

export default AudioPageComponent;
