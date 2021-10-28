import { Tab } from '@headlessui/react';
import axios from 'axios';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import PodcastReviewCards from '../../../components/PodcastReviewCard/PodcastReviewCards';
import { classNames } from '../../../components/UserDashboard/UserNavbar';
import { useUser } from '../../../utils/hooks';
import { capitalizeFirstLetter } from '../../../components/AudioCard/AudioCard';
import ContestCard from './../../../components/Contest/ContestCard';

const ContestDash = props => {
  // Check if authorized, else redirect to login
  const user = useUser({ redirectTo: '/admin/login', redirectIfFound: false });

  const logout = async e => {
    e.preventDefault();

    await axios.post('/api/auth/logout');

    Router.push('/admin/login');
  };

  let [categories] = useState({
    'Active Contest': {
      id: 1,
      status: 'active',
      content: EndContest,
    },
    'Listener award': {
      id: 2,
      status: 'active',
      content: ListenerAward,
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
            {<Tabs.content key={Tabs.id} status={Tabs.status} />}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default ContestDash;

export function ListenerAward() {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/draw_listeners?get=true`)
      .then(res => {
        console.log(res.data);
        setWinners(res.data.contest.contest_results.reverse());
      })
      .catch(err => console.log(err));
  }, []);

  const handleClick = () => {
    axios
      .get(`/api/draw_listeners`)
      .then(res => {
        console.log(res.data);
        setWinners(res.data.contest.contest_results.reverse());
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="hero">Listener award</h1>
        <div className="my-4">
          <button
            onClick={handleClick}
            className="my-2 p-2 border border-indigo-650 rounded-md text-white bg-indigo-650 hover:bg-white hover:text-indigo-650"
          >
            Draw winners
          </button>
        </div>
        {winners &&
          winners.map((elem, i) => {
            console.log(elem);
            const arr = elem.result.map((e, idx) => {
              return e.creatorEmail;
            });
            return (
              <div key={i} className="my-2 border border-black p-2">
                <strong>{i + 1}.</strong> {new Date(elem.date).toDateString()} :{' '}
                {arr.join(', ')}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function EndContest({ status }) {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/contest?status=${status}`)
      .then(res => {
        setContests(res.data.result);
      })
      .catch(err => {
        console.error(err);
      });

    return;
  }, [status]);

  function endContest(id) {
    axios
      .post(`/api/contest`, { id: id, action: 'END' })
      .then(res => {
        const temp = contests.filter(e => e._id != id);
        setContests(temp);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="hero">{capitalizeFirstLetter(status)} Contest</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contests &&
            contests.map((contest, i) => {
              return (
                <ContestCard
                  key={i}
                  contest={contest}
                  endContest={endContest}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
