import React, { useState } from 'react';
import axios from 'axios';
import Tornado from '../assets/sun-tornado.svg';
import Link from 'next/link';
import {
  TERMS_AND_CONDITIONS_ENDPOINT,
  USER_AGREEMENT_ENDPOINT,
  PRIVACY_POLICY_ENDPOINT,
  CONTENT_POLICY_ENDPOINT,
  TAKEDOWN_POLICY_ENDPOINT,
} from './../constants';

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

const AboutUs = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Enter a valid Email-id');
      return;
    }

    axios.post('/api/subscribe', { email: email }).then(res => {
      if (res.data.success) {
        alert('Subscribed successfully');
      } else {
        alert('Something went wrong, try again later');
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="flex flex-col space-y-6">
          <div className="text-center mx-auto mobile:text-3xl text-5xl max-w-2xl leading-snug text-indigo-650 font-medium">
            AI-powered social audio streaming service blended with midas human
            touch​
          </div>
          <div className="text-center text-2xl mobile:text-xl mobile:px-3">
            Magic happens when human creations meets technology and that’s what
            Radyo is all about. Radyo is India’s first social audio streaming
            platform that empowers artists create, share & socialize their
            creative work and enable billion users to consume masterpieces that
            entertains, motivates, inspires, engages, in best-in-class
            experience.​
          </div>
        </div>
      </div>

      <div className="relative my-5">
        <Prism />
        <div className="container absolute top-6">
          <p className="text-gray-900 text-center text-4xl mobile:text-2xl tracking-wide font-medium max-w-2xl mx-auto leading-snug">
            “I could either watch it happen or be a part of it.”
            <p className="text-right font-medium text-xl mobile-lg mobile:mr-3 mobile:mt-3">
              - Elon Musk
            </p>
          </p>
        </div>
      </div>

      <div className="container flex flex-col space-y-12 mobile:px-3">
        <div className="space-y-2 mt-8">
          <div className="text-indigo-650 text-center text-3xl">
            Radyo is for Creative artists
          </div>
          <div className="text-xl text-center">
            Your voice is your magic and Radyo helps spreading that magic to the
            world. With Radyo, record (and upload) your audio on any topics be
            it (not limited to) Songs, Comedy, Shayari, Motivation, Stories,
            Dialogues, Poetry and many more. Build a meaningful connection with
            your fan base, make a mark in the world of creatives and open up a
            potential recurring income stream. ​ If you are ready to take your
            work to the next level, take back creative controls.
            <Link href="/login">
              <a className="text-blue-600"> Join Radyo now</a>
            </Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-indigo-650 text-center text-3xl">
            Radyo is for Listeners​
          </div>
          <div className="text-xl text-center">
            We understand, you can’t be looking at videos all the time, and
            that’s why we built Radyo. An audio-only platform that brings in
            unlimited entertainment, absolutely free, round the clock to you,
            that you can consume in all conditions (be you are working,
            exercising, running, travelling, or even taking a sun bath on a lazy
            Sunday morning) ​
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${Tornado.src})` }}
        className="bg-no-repeat bg-fixed bg-cover w-full mt-8"
      >
        <div className="flex flex-col max-w-xl mx-auto space-y-4 text-white text-3xl text-center my-9">
          <div className="">
            Subscribe to our newsletter, get latest updates on new releases
            directly delivered to your mailbox
          </div>
          <form
            onSubmit={handleSubmit}
            className="text-base mobile:py-8 laptop:py-4 ipad:py-2"
          >
            <input
              className="rounded-l-md px-3 py-2 text-sm text-black focus:outline-none"
              type="text"
              name="email"
              placeholder="Enter your email Id"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-650 py-2 px-3 rounded-r-md text-sm "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <footer className="flex justify-between p-4 mobile:p-2">
        <div>
          <p className="text-2xl font-semibold text-indigo-650">Radyo.ai</p>
          <div className="py-2">
            <Link href="mailto:contact@nuzpapr.com">
              <a className="text-blue-600">contact@radyo.ai.com</a>
            </Link>
          </div>
          <div className="pt-8 mobile:pt-8 pb-2">
            © All rights reserved&nbsp;2021
          </div>
        </div>
        <div>
          <div className="py-1">
            <Link href={TERMS_AND_CONDITIONS_ENDPOINT}>
              <a>Terms and Conditions</a>
            </Link>
          </div>
          <div className="py-1">
            <Link href={USER_AGREEMENT_ENDPOINT}>
              <a>User Agreement</a>
            </Link>
          </div>
          <div className="py-1">
            <Link href={PRIVACY_POLICY_ENDPOINT}>
              <a>Privacy Policy</a>
            </Link>
          </div>
          <div className="py-1">
            <Link href={CONTENT_POLICY_ENDPOINT}>
              <a>Content Policy</a>
            </Link>
          </div>
          <div className="py-1">
            <Link href={TAKEDOWN_POLICY_ENDPOINT}>
              <a>Takedown Policy</a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export function Prism() {
  return (
    <svg
      className="absolute my-6"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
    >
      <defs>
        <linearGradient
          id="a"
          gradientUnits="userSpaceOnUse"
          x1="0"
          x2="0"
          y1="0"
          y2="100%"
          gradientTransform="rotate(240)"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#4FE" />
        </linearGradient>
        <pattern
          patternUnits="userSpaceOnUse"
          id="b"
          width="540"
          height="450"
          x="0"
          y="0"
          viewBox="0 0 1080 900"
        >
          <g fillOpacity="0.1">
            <polygon fill="#444" points="90 150 0 300 180 300" />
            <polygon points="90 150 180 0 0 0" />
            <polygon fill="#AAA" points="270 150 360 0 180 0" />
            <polygon fill="#DDD" points="450 150 360 300 540 300" />
            <polygon fill="#999" points="450 150 540 0 360 0" />
            <polygon points="630 150 540 300 720 300" />
            <polygon fill="#DDD" points="630 150 720 0 540 0" />
            <polygon fill="#444" points="810 150 720 300 900 300" />
            <polygon fill="#FFF" points="810 150 900 0 720 0" />
            <polygon fill="#DDD" points="990 150 900 300 1080 300" />
            <polygon fill="#444" points="990 150 1080 0 900 0" />
            <polygon fill="#DDD" points="90 450 0 600 180 600" />
            <polygon points="90 450 180 300 0 300" />
            <polygon fill="#666" points="270 450 180 600 360 600" />
            <polygon fill="#AAA" points="270 450 360 300 180 300" />
            <polygon fill="#DDD" points="450 450 360 600 540 600" />
            <polygon fill="#999" points="450 450 540 300 360 300" />
            <polygon fill="#999" points="630 450 540 600 720 600" />
            <polygon fill="#FFF" points="630 450 720 300 540 300" />
            <polygon points="810 450 720 600 900 600" />
            <polygon fill="#DDD" points="810 450 900 300 720 300" />
            <polygon fill="#AAA" points="990 450 900 600 1080 600" />
            <polygon fill="#444" points="990 450 1080 300 900 300" />
            <polygon fill="#222" points="90 750 0 900 180 900" />
            <polygon points="270 750 180 900 360 900" />
            <polygon fill="#DDD" points="270 750 360 600 180 600" />
            <polygon points="450 750 540 600 360 600" />
            <polygon points="630 750 540 900 720 900" />
            <polygon fill="#444" points="630 750 720 600 540 600" />
            <polygon fill="#AAA" points="810 750 720 900 900 900" />
            <polygon fill="#666" points="810 750 900 600 720 600" />
            <polygon fill="#999" points="990 750 900 900 1080 900" />
            <polygon fill="#999" points="180 0 90 150 270 150" />
            <polygon fill="#444" points="360 0 270 150 450 150" />
            <polygon fill="#FFF" points="540 0 450 150 630 150" />
            <polygon points="900 0 810 150 990 150" />
            <polygon fill="#222" points="0 300 -90 450 90 450" />
            <polygon fill="#FFF" points="0 300 90 150 -90 150" />
            <polygon fill="#FFF" points="180 300 90 450 270 450" />
            <polygon fill="#666" points="180 300 270 150 90 150" />
            <polygon fill="#222" points="360 300 270 450 450 450" />
            <polygon fill="#FFF" points="360 300 450 150 270 150" />
            <polygon fill="#444" points="540 300 450 450 630 450" />
            <polygon fill="#222" points="540 300 630 150 450 150" />
            <polygon fill="#AAA" points="720 300 630 450 810 450" />
            <polygon fill="#666" points="720 300 810 150 630 150" />
            <polygon fill="#FFF" points="900 300 810 450 990 450" />
            <polygon fill="#999" points="900 300 990 150 810 150" />
            <polygon points="0 600 -90 750 90 750" />
            <polygon fill="#666" points="0 600 90 450 -90 450" />
            <polygon fill="#AAA" points="180 600 90 750 270 750" />
            <polygon fill="#444" points="180 600 270 450 90 450" />
            <polygon fill="#444" points="360 600 270 750 450 750" />
            <polygon fill="#999" points="360 600 450 450 270 450" />
            <polygon fill="#666" points="540 600 630 450 450 450" />
            <polygon fill="#222" points="720 600 630 750 810 750" />
            <polygon fill="#FFF" points="900 600 810 750 990 750" />
            <polygon fill="#222" points="900 600 990 450 810 450" />
            <polygon fill="#DDD" points="0 900 90 750 -90 750" />
            <polygon fill="#444" points="180 900 270 750 90 750" />
            <polygon fill="#FFF" points="360 900 450 750 270 750" />
            <polygon fill="#AAA" points="540 900 630 750 450 750" />
            <polygon fill="#FFF" points="720 900 810 750 630 750" />
            <polygon fill="#222" points="900 900 990 750 810 750" />
            <polygon fill="#222" points="1080 300 990 450 1170 450" />
            <polygon fill="#FFF" points="1080 300 1170 150 990 150" />
            <polygon points="1080 600 990 750 1170 750" />
            <polygon fill="#666" points="1080 600 1170 450 990 450" />
            <polygon fill="#DDD" points="1080 900 1170 750 990 750" />
          </g>
        </pattern>
      </defs>
      <rect x="0" y="0" fill="url(#a)" width="100%" height="100%" />
      <rect x="0" y="0" fill="url(#b)" width="100%" height="100%" />
    </svg>
  );
}

export default AboutUs;
