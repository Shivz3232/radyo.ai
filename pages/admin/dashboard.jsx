import axios from 'axios';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import PodcastReviewCards from '../../components/PodcastReviewCard/PodcastReviewCards';
import { useUser } from '../../utils/hooks';

const Dashboard = props => {
  // Check if authorized, else redirect to login
  const user = useUser({ redirectTo: '/admin/login', redirectIfFound: false });

  const [podcasts, setPodcasts] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });
  useEffect(() => {
    const player = document.querySelector('#audio-player');
    player.classList.remove('absolute');
    player.classList.add('fixed');
  }, []);

  function playAudio(info) {
    setTrackInfo(info);
    props.play(info);
  }

  useEffect(() => {
    axios
      .get('/api/inreview')
      .then(res => {
        setPodcasts(res.data.podCasts);
      })
      .catch(err => {
        console.error(err);
        setErrMsg('Failed to fetch podcasts. Please try later');
      });
  }, []);

  const logout = async e => {
    e.preventDefault();

    await axios.post('/api/auth/logout');

    Router.push('/admin/login');
  };

  const approve = id => {
    axios
      .post('/api/inreview', { action: 'approve', id })
      .then(() => {
        const temp = podcasts.filter(e => e._id != id);
        setPodcasts(temp);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to approve.');
      });
  };

  const reject = id => {
    axios
      .post('/api/inreview', { action: 'reject', id })
      .then(() => {
        const temp = podcasts.filter(e => e._id != id);
        setPodcasts(temp);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to reject.');
      });
  };

  if (!user) return <></>;

  return (
    <div className="dashboard">
      {/* <Banner size="sm" /> */}
      <div className="logout">
        <div onClick={logout}>Logout</div>
      </div>
      <div className="container">
        <h1 className="hero">Podcasts to be reviewed</h1>
        <PodcastReviewCards
          podcasts={podcasts}
          playAudio={playAudio}
          approve={approve}
          reject={reject}
        />
      </div>
      {/* <div
        className="audio-player-dashboard"
        style={{ display: trackInfo.audioSrc ? '' : 'none' }}
      >
        <AudioPlayer trackInfo={trackInfo} />
      </div> */}
    </div>
  );
};

export default Dashboard;
