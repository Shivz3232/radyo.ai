import { Router } from 'next/dist/client/router';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const followCreator = async (
  creatorId,
  setFollowing,
  following,
  setFollowers
) => {
  const action = !following ? 'FOLLOW' : 'UNFOLLOW';
  const data = {
    timestamp: new Date().getTime(),
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

const CreatorCard = ({
  data,
  userid,
  following,
  setFollowing,
  followers,
  setFollowers,
}) => {
  const router = useRouter();
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
            {data && followers.length}
          </span>
          <span className="creator-card__action--item">Followers</span>
        </div>
      </div>

      <div className="button-container">
        <button className="playButton">Play All</button>
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
        <button className="shareButton">Share</button>
      </div>
    </>
  );
};

export default CreatorCard;
