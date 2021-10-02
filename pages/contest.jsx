import React, {useState} from 'react';
import HomeCarousel from './../components/HomeCarousel/HomeCarousel';
import loadable from '@loadable/component'
import Link from 'next/link';
const BarChartRace1 = loadable(() => import('./../components/Leaderboard/LeaderBoard'))
const Contest = () => {
  const [isClicked, setIsClicked]= useState(false)
  const images = [
    'https://via.placeholder.com/411x256',
    'https://via.placeholder.com/1024x320',
    'https://via.placeholder.com/411x256',
    'https://via.placeholder.com/1024x320',
  ];
  return <div className="container">
            <div className={`flex flex-row sm:my-4`}>
                  <button
                    className={` w-60 mx-2 rounded-md border border-indigo-650 px-2 py-2 text-white bg-indigo-650 md:mt-8 sm:wd-20`}
                    onClicked={()=>setIsClicked(true)}
                  >
                    <Link href="#"><a>Contest 1</a></Link>
                  </button>
                  <button
                    className={`w-60 mx-2 rounded-md border border-indigo-650 px-2 py-1 sm:wd-20 ${
                      isClicked==1
                        ? 'text-white bg-indigo-650'
                        : 'text-indigo-650 hover:bg-gray-100'
                    } md:mt-8`}
                    onClicked={()=>setIsClicked(true)}
                  >
                    <Link href="#"><a>Contest 2</a></Link>
                  </button>
                  <button
                    className={` w-60 mx-2 rounded-md border border-indigo-650 px-2 py-1 sm:wd-20 ${
                      isClicked==1
                        ? 'text-white bg-indigo-650'
                        : 'text-indigo-650 hover:bg-gray-100'
                    } md:mt-8`}
                    onClicked={()=>setIsClicked(true)}
                  >
                    <Link href="#"><a>Jackpot</a></Link>
                  </button>
                  <button
                    className={` w-60 mx-2 rounded-md border border-indigo-650 px-2 py-1 sm:wd-20 ${
                      isClicked==1
                        ? 'text-white bg-indigo-650'
                        : 'text-indigo-650 hover:bg-gray-100'
                    } md:mt-8`}
                    onClicked={()=>setIsClicked(true)}
                  >
                    <Link href="#"><a>Past Contests</a></Link>
                  </button>
                </div>
          <div className="flex justify-center md:mt-8">
            <HomeCarousel images={images} />
          </div>

          <div className={`w-full text-center flex rounded-md items-center mt-2 sm:mt-8 sm:text-xs`}>
              <div className={`w-3/5 flex-row mx-1 rounded-md border border-indigo-650 `}>
                  <div className={`text-white bg-indigo-650 h-18 py-2 sm:text-sm`}>Contest 1 Rules and Regulations</div>
                  <div className={`text-indigo-650 h-96`}></div>
              </div>
              <div className={`w-2/5 flex-row mx-1  rounded-md border border-indigo-650 `}>
                  <div className={`text-white bg-indigo-650 py-2 h-18 sm:text-sm`}>Live Leaderboard</div>
                  <div className={`text-indigo-650 `}>
                    <BarChartRace1/>
                  </div>
              </div>
          </div>

  </div>;
};
export async function getStaticProps() {
  return {
    props: {
      activeTab: '/contest',
    },
  };
}
export default Contest;
