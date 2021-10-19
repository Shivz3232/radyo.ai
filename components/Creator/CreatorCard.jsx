import React, { useState, useEffect } from 'react';
import {usePlaylist} from '../../controllers/PlaylistProvider';

const CreatorCard = ({ data,creatorPlaylist }) => {
  const { playAudio,contextPlaylist,setContextPlaylist,getNextTrack } = usePlaylist();

  function playAll(){
    setContextPlaylist(creatorPlaylist);
    playAudio({
        audioSrc: creatorPlaylist[0].audioSrc,
        coverSrc: creatorPlaylist[0].coverImage,
        title: creatorPlaylist[0].title,
      },creatorPlaylist[0]._id);
  }

  return (
    <>
      <div className="creator-card mini generic-card">
        <div className="creator-card--image">
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
        <div className="creator-card__header">
          <div className="creator-card__header--items">
            <div className="creator-card__header--item creator-card__author">
              {data && data.creatorName}
            </div>
            <div className="creator-card__header--item creator-card__aboutme">
              {data && data.about}
            </div>
          </div>
        </div>
      </div>

      <div className="creatorCard__action--row">
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data && data.audiosPublished}
          </span>
          <span className="creator-card__action--item">Audios </span>
        </div>
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data && data.playCount}
          </span>
          <span className="creator-card__action--item"> Plays</span>
        </div>
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data && data.subscriberCount}
          </span>
          <span className="creator-card__action--item">Followers</span>
        </div>
      </div>

      <div className="button-container">
        <button className="playButton" onClick={playAll}>Play All</button>
        <button className="fsButton">Follow</button>
        <button className="shareButton">Share</button>
      </div>
    </>
  );
};

export default CreatorCard;
