import React,{useState, useEffect} from 'react';

const CreatorCard = ({ data }) => {
  
  return (
    <>
      <div className="creator-card mini generic-card">
      <div className="creator-card--image">
            <img
              className="creator-card__roundedimage"
              src={
                data.avatarImage
                  ? data.avatarImage :
                   '/lovebytes/images/Picture1.jpg'
              }
              alt="Love"
            />
          </div>
        <div className="creator-card__header">
          
          <div className="creator-card__header--items">
            <div className="creator-card__header--item creator-card__author">
              {data.creatorName}
            </div>
            <div className="creator-card__header--item creator-card__aboutme">
              {data.about}
            </div>
          </div>
        </div>

      </div>

      <div className="creatorCard__action--row">
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data.audiosPublished}
          </span>
          <span className="creator-card__action--item">Audios </span>
        </div>
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data.playCount}
            </span>
          <span className="creator-card__action--item"> Plays</span>
        </div>
        <div className="creator-card__action">
          <span className="creator-card__action--item">
            {data.subscriberCount}
          </span>
          <span className="creator-card__action--item">Followers</span>
        </div>
      </div>

      <div className="button-container">
        <button className="playButton">Play All</button>
        <button className="fsButton">
         Follow
        </button>
        <button className="shareButton" >Share</button>

      </div>
    </>
  );
};

export default CreatorCard;
