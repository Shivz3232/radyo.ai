import { Tab } from '@headlessui/react';
import axios from 'axios';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import PodcastReviewCards from '../../components/PodcastReviewCard/PodcastReviewCards';
import { classNames } from '../../components/UserDashboard/UserNavbar';
import { useUser } from '../../utils/hooks';
import { capitalizeFirstLetter } from '../../components/AudioCard/AudioCard';

const Dash = props => {
  // Check if authorized, else redirect to login
  const user = useUser({ redirectTo: '/admin/login', redirectIfFound: false });

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

  const logout = async e => {
    e.preventDefault();

    await axios.post('/api/auth/logout');

    Router.push('/admin/login');
  };

  let [categories] = useState({
    'To be reviewed': {
      id: 1,
      status: 'inreview',
      content: Inreview,
    },
    Approved: {
      id: 2,
      status: 'approved',
      content: Inreview,
    },
    Rejected: {
      id: 3,
      status: 'rejected',
      content: Inreview,
    },
    Reported: {
      id: 4,
      status: 'reported',
      content: Inreview,
    },
  });

  if (!user) return <></>;
  return (
    <Tab.Group>
      <div className="w-full max-w-md px-4 py-5 md:mt-0 mt-8 sm:px-0 mx-auto">
        <div
          onClick={logout}
          className="absolute right-8 top-20 rounded-md p-2 cursor-pointer border border-indigo-650 bg-indigo-650 text-white hover:bg-white hover:text-indigo-650"
        >
          Admin Logout
        </div>
        <Tab.List className="flex p-1 space-x-1 bg-indigo-650 rounded-xl">
          {Object.keys(categories).map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-indigo-800 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow transition'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white transition'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="">
        {Object.values(categories).map((Tabs, idx) => (
          <Tab.Panel key={idx}>
            {
              <Tabs.content
                key={Tabs.id}
                status={Tabs.status}
                playAudio={playAudio}
              />
            }
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Dash;

export function Inreview({ playAudio, status }) {
  const [podcasts, setPodcasts] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    axios
      .get(`/api/inreview?status=${status}`)
      .then(res => {
        setPodcasts(res.data.podCasts);
      })
      .catch(err => {
        console.error(err);
        setErrMsg('Failed to fetch podcasts. Please try later');
      });

    return;
  }, [status]);
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

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="hero">{capitalizeFirstLetter(status)} Podcasts</h1>
        <PodcastReviewCards
          podcasts={podcasts}
          playAudio={playAudio}
          approve={['approved', 'reported'].includes(status) ? false : approve}
          reject={['rejected'].includes(status) ? false : reject}
          showReport={['reported'].includes(status)}
        />
      </div>
    </div>
  );
}
