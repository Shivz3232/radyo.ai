import React from 'react';
import playButton from '../../assets/playbtn.png';
import { usePlaylist } from '../../controllers/PlaylistProvider';
// import { Button } from '@material-ui/core';
import { formatDuration } from '../../utils/formatDuration';

const PodcastReviewCard = ({ podcast, approve, reject, showReport }) => {
  const trackInfo = {
    coverSrc: `${podcast.coverImage}`,
    audioSrc: `${podcast.audioSrc}`,
    title: podcast.title,
  };
  const { playAudio } = usePlaylist();
  return (
    <div className="podcast-review-card shadow-lg border ">
      <section className="section-1 flex flex-col justify-between md:border-green ">
        <h2 className="font-bold">{podcast.title}</h2>
        <h4 className="">{podcast.creatorId.creatorName}</h4>
        {showReport && podcast.reported && podcast.reported > 0 && (
          <span className="text-red-800">
            Reported {podcast.reported} times{' '}
          </span>
        )}
        <div className="descision__buttons">
          {approve && (
            <button
              className="border-2 border-indigo-650 rounded-md p-2 bg-indigo-650 text-white hover:bg-white hover:text-indigo-650"
              style={{ marginRight: '1rem' }}
              onClick={e => approve(podcast._id)}
            >
              Approve
            </button>
          )}
          {reject && (
            <button
              className="border-2 border-red-500 rounded-md p-2 bg-red-500 text-white hover:bg-white hover:text-red-500"
              onClick={e => reject(podcast._id)}
            >
              Reject
            </button>
          )}
        </div>
      </section>
      <section className="section-2 flex flex-col justify-between">
        <p>
          Uploaded On:{' '}
          <span>{new Date(podcast.createdAt).toLocaleDateString()}</span>
        </p>
        <p>
          File Size: <span>{podcast.fileSize}</span>
        </p>
        <p>
          Duration: <span>{formatDuration(podcast.duration)}</span>
        </p>
        <p>
          Category: <span>{podcast.category}</span>
        </p>
        <p>
          Tags: <span>{podcast.tags.map(tag => tag)}</span>
        </p>
      </section>
      <section className="section-3">
        <img
          className="cover__img"
          src={`${podcast.coverImage}`}
          alt="cover image"
        />
        <img
          src={playButton.src}
          alt="play button"
          onClick={() => {
            playAudio(trackInfo, podcast._id.toString());
          }}
          className="play__button"
        />
      </section>
    </div>
  );
};

export default PodcastReviewCard;
