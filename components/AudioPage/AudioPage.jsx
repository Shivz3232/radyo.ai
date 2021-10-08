import axios from 'axios';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { decode } from 'html-entities';
// import { Event } from '../Tracking/Tracking';
import Link from 'next/link';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaFacebook, FaHeart } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import { FACEBOOK_APP_ID } from '../../constants';
import { useAuth } from '../../controllers/auth';
import { capitalizeFirstLetter } from '../AudioCard/AudioCard';
import ReportPopover from './ReportPopover';
import { MdOutlineReportProblem } from 'react-icons/md';

dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
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

const AudioPageComponent = ({ data, playAudio }) => {
  const { userid } = useAuth();
  const [report, setReport] = useState(() => {
    if (data.reportedBy) return false;
  });
  useEffect(() => {
    data.reportedBy.forEach(e => {
      if (e.userId === userid) {
        // console.log(e);
        setReport(true);
        return;
      }
    });
    // console.log(report);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const trackInfo = {
    coverSrc: data.coverImage,
    audioSrc: '/lovebytes/audio/Audio1.mp3',
    title: data.title,
  };
  const [origin, setOrigin] = useState();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  // console.log('Trackinfo in audiopage component:', trackInfo);

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
    const fbScript = document.createElement('script');
    fbScript.async = true;
    fbScript.src = `https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v12.0&appId=${FACEBOOK_APP_ID}&autoLogAppEvents=1`;
    document.body.appendChild(fbScript);
  }, []);

  return (
    <>
      {/*AudioCard*/}
      <div className="audioPage-card mini generic-card">
        <div className="audioPage-card__category">
          {capitalizeFirstLetter(data.category)}
        </div>

        <div className="audioPage-card__header">
          <div className="audioPage-card__header--items">
            <div className="audioPage-card__header--item audioPage-card__title">
              {data.title}
            </div>
            <Link href={`/creator/${data.creatorId._id}`}>
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
          <div className="audioPage-card__action">
            <FaHeart className="audioPage-card__action--item" />
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

      {/*Button Row*/}
      <div className="button-row">
        <button
          className="play-btn"
          onClick={() => {
            playAudio(trackInfo);
            // Event('Audio', 'Play button clicked', data.title);
          }}
        >
          Play Now
        </button>
        <div className="share-btn flex border rounded p-2 m-2">
          <div className="mx-1">Share with Friends</div>
          <div className="flex">
            <div className="h-8 w-8 mx-1">
              <a href={getFacebookShareLink()} target="_blank" rel="noreferrer">
                <FaFacebook size="small" color="#4267B2" />
              </a>
            </div>
            <div className="h-8 w-8 mx-1">
              <a href={getTelegramShareLink()} target="_blank" rel="noreferrer">
                <img src={logoTelegram.src} alt="Share on Telegram" />
              </a>
            </div>
            <div className="h-8 w-8 mx-1">
              <a href={getWhatsAppShareLink()} target="_blank" rel="noreferrer">
                <img src={logoWhatsapp.src} alt="Share on Whatsapp" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*Comment Box*/}
      <div className="comment-box-container">
        <div id="fb-root"></div>
        <div
          className="fb-comments"
          data-href="http://localhost:3000/podcast/audio"
          data-width="500"
          data-numposts="5"
        ></div>
      </div>
    </>
  );
};

export default AudioPageComponent;
