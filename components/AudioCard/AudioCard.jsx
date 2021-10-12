import { decode } from 'html-entities';
import Link from 'next/link';
import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import LinesEllipsis from 'react-lines-ellipsis';
// import { Event } from '../../../nuzpapr-next/components/Tracking/Tracking';
import playButton from '../../assets/playbtn.png';
import { CgPlayListAdd, CgPlayListCheck } from 'react-icons/cg';
import { usePlaylist } from '../../controllers/PlaylistProvider';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const AudioCard = ({ cardItemData, categoryName }) => {
  const trackInfo = {
    coverSrc: `${cardItemData.coverImage}`,
    audioSrc: cardItemData.audioSrc,
    title: cardItemData.title,
  };

  const { playAudio } = usePlaylist();
  // Destructuring the props item
  const {
    creatorId,
    category,
    title,
    playCount,
    likeCount,
    shareCount,
    coverImage,
  } = cardItemData;

  return (
    <div
      className="audio-card mini generic-card"
      id={`${categoryName}-${cardItemData._id}`}
    >
      <div className="audio-card__header">
        <div className="audio-card__header--image">
          <img
            className="audio-card__image"
            src={
              coverImage.length ? coverImage : '/lovebytes/images/Picture1.jpg'
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
          <Link href={`/audio/${cardItemData._id}`} locale={false}>
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
            By:{creatorId.creatorName}
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
          <FaShareAlt className="audio-card__action--item" />
          <span className="audio-card__action--item">{shareCount}</span>
        </div>
        <div className="audio-card__action">
          <CgPlayListAdd
            fontSize="1.65rem"
            className="audio-card__action--item"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
