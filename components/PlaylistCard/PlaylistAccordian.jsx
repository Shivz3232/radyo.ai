import axios from 'axios';
import { decode } from 'html-entities';
import React, { useEffect, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import { FaFacebook, FaHeart, FaRegHeart } from 'react-icons/fa';
import logoTelegram from '../../assets/telegram.svg';
import logoWhatsapp from '../../assets/whatsapp.svg';
import { FACEBOOK_APP_ID } from '../../constants';
import { usePlaylist } from '../../controllers/PlaylistProvider';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import AccordionPlaylistList from './AccordionPlaylistList';

const PlaylistAccordian = ({ data }) => {
  const { setContextPlaylist, playAudio } = usePlaylist();
  const [origin, setOrigin] = useState();
  const [audioList, setAudioList] = useState(data.podcastList);
  let trackInfo = {};
  if (audioList.length) {
    trackInfo = {
      coverSrc: data.podcastList[0].coverImage,
      audioSrc: data.podcastList[0].audioSrc,
      title: data.podcastList[0].title,
    };
  }
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

  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <span className="audioPage-card__header--item audioPage-card__title ">
            {data.title}
          </span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        {data.podcastList.length > 0 ? (
          <>
            <div className="button-row">
              <button
                className="play-btn"
                onClick={() => {
                  if (audioList.length) {
                    playAudio(trackInfo, data._id.toString());
                    setContextPlaylist(data.podcastList);
                  }
                }}
              >
                Play Now
              </button>
              <div className="share-btn flex border rounded p-2 mb-2">
                <div className="mx-1">Share with Friends</div>
                <div className="flex">
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
            <AccordionPlaylistList
              playlistId={data._id}
              podcastList={data.podcastList}
              audioList={audioList}
              setAudioList={setAudioList}
            />
          </>
        ) : (
          <div> No Audio available </div>
        )}
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default PlaylistAccordian;
