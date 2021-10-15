import React, { useState } from 'react';
import HomeCarousel from '../components/HomeCarousel/HomeCarousel';
import axios from 'axios';
import Banner2 from '../assets/Banner_English_artist.svg';
import Banner3 from '../assets/Banner_English_Listener.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getURL, urlObjectKeys } from 'next/dist/shared/lib/utils';

const AboutUs = () => {
  const images = [Banner2.src, Banner3.src];
  return (
    <>
      <div className="container">
        {/* <HomeCarousel images={images} /> */}
        <div className="text-center text-5xl px-36 leading-snug my-6 text-indigo-650 font-medium">
          AI-powered social audio streaming service blended with midas human
          touch​
        </div>
        <div className="text-center mb-6 mt-10 text-2xl">
          Magic happens when human creations meets technology and that’s what
          Radyo is all about. Radyo is India’s first social audio streaming
          platform that empowers artists create, share & socialize their
          creative work and enable billion users to consume masterpieces that
          entertains, motivates, inspires, engages, in best-in-class
          experience.​
        </div>
        <div className="relative">
          <Prism className="" />
          <div className="container absolute top-12">
            <p className="text-gray-900 text-center text-4xl font-semibold px-52">
              “I could either watch it happen or be a part of it.”
              <p className="text-right font-medium text-xl mr-6">- Elon Musk</p>
            </p>
          </div>
        </div>
        <div className="mx-auto">
          <div className="text-indigo-650 text-center text-3xl mt-36 mb-6">
            Radyo is for Creative artists
          </div>
          <div className="text-xl text-center">
            Your voice is your magic and Radyo helps spreading that magic to the
            world. With Radyo, record (and upload) your audio on any topics be
            it (not limited to) Songs, Comedy, Shayari, Motivation, Stories,
            Dialogues, Poetry and many more. Build a meaningful connection with
            your fan base, make a mark in the world of creatives and open up a
            potential recurring income stream. ​ If you are ready to take your
            work to the next level, take back creative controls{' '}
            <a href="#" className="text-blue-400">
              Join Radyo now
            </a>
          </div>
        </div>
        <div>
          <div className="text-indigo-650 text-center text-3xl my-6">
            Radyo is for Creative artists
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
    </>
  );
};

export default AboutUs;

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

// import React from 'react';

// const AboutUs = () => {
//   return (
//     <>
//       <div></div>
//     </>
//   );
// };

// export async function getStaticProps() {
//   return {
//     props: {
//       activeTab: '/about-us',
//     },
//   };
// }

// export default AboutUs;
