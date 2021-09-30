import React from 'react';

const CreatorCard = ({ data }) => {
  return (
    <>
      <div className="creator-card mini generic-card">
        <div className="creator-card__header">
          <div className="creator-card__header--image">
            <img
              className="creator-card__roundedimage"
              src={
                data.avatarImage
                  ? data.avatarImage
                  : '/lovebytes/images/Picture1.jpg'
              }
              alt="Love"
            />
          </div>
          <div className="creator-card__header--items">
            <div className="creator-card__header--item creator-card__author">
              {data.creatorName}
            </div>
            <div className="creator-card__header--item creator-card__aboutme">
              {data.about}
            </div>
          </div>
        </div>

        <button className="subscribe-btn">Subscribe</button>
      </div>

      <div className="creator-card mini generic-card">
        <div className="creator-card__action--row">
          <div className="creator-card__action">
            <span className="creator-card__action--item">
              {data.audiosPublished}
            </span>
            <span className="creator-card__action--item">Audios Published</span>
          </div>
          <div className="creator-card__action">
            <span className="creator-card__action--item">{data.playCount}</span>
            <span className="creator-card__action--item"> Plays Count</span>
          </div>
          <div className="creator-card__action">
            <span className="creator-card__action--item">
              {data.subscriberCount}
            </span>
            <span className="creator-card__action--item">subscribers</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorCard;
