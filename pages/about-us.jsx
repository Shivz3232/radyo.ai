import React, {useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import Section4 from '../components/About-Us/Section4'
import Position1 from '../components/About-Us/Position1'
import Position2 from '../components/About-Us/Position2'
import sunTornada from '../assets/sun-tornado.svg'
import dragonScales from '../assets/dragon-scales.svg'
import axios from 'axios'
import {useRouter} from 'next/router'
const AboutUs = () => {
  const [errors, setErrors]= useState();
  const [email, setEmail]= useState('');

  const postData = async (email)=>{
    try{
      const res = await axios.post('/api/subscribe', {email:email});
      console.log("email ",res.json());
     
    }catch(error){
      setErrors('Failed to subscribe')
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault();
    const errs= formValidate();
    if(!errs){
      postData(email)==true? setEmail(''): window.alert("Unable to post email")
     
    }else{ 
           setErrors({errs});
     }
 
  }

  const formValidate =()=>{
    let err={}
    if(!email){
      err.email="Email is required"
    return err;
    }
  }
  return (
    <>
       <div className="about-us flex flex-wrap">
            
          <section className="carousel-box mobile:w-full">
            <Carousel 
            autoPlay
            infiniteLoop
            stopOnHover
            emulateTouch
            showThumbs={false}
            >
              <div className="max-h-80 flex flex-1 w-full items-center justify-center">
                <img src={ sunTornada.src} alt="carousel" className=" absolute"/>
                <p className="z-0 relative text-white text-left text-5xl py-20  w-3/4 mobile:text-3xl ml-64 mobile:mb-12 mobile:ml-10">We help <span className="text-blue-500">online </span><p className="text-blue-500">news publications</p> reach new heights </p>
              </div>
        
              <div className="max-h-30 flex flex-1 w-full items-center justify-center mobile:max-h-30">
                <img img src={ dragonScales.src} alt="carousel" className=" absolute"/>
                <p className="z-0 relative text-white text-center pt-12 tracking-wider text-4xl  w-1/2 mobile:text-2xl">Innovative minds leveraging technology to bring the best to a billion users​ </p>          
              </div>
            </Carousel>
          </section>

          <section className="h-full mt-6 mb-2 flex flex-wrap mobile:my-2">
            <blockquote>
              <h1 className="text-5xl text-center w-2/3 mx-56 mobile:text-3xl mobile:mx-10 mobile:w-4/5 laptop:w-3/4 laptop:mx-40">AI-powered news aggregation presented with a <u>best in class</u> consumer experience</h1>
            </blockquote>
            <p class="text-lg font-normal w-full text-center mx-8 py-2 my-2 tracking-widest">
            India’s fastest growing news aggregation platform that brings in high quality 
            news from trusted & authentic sources across India, empowering our readers to 
            consume and socialize content in their own language seamlessly.
            </p>
            <p className="text-lg font-normal text-center mx-auto mobile:text-base mobile:mx-auto">Read News &nbsp; &nbsp; |&nbsp;&nbsp;    Play games &nbsp;&nbsp;   |&nbsp;&nbsp;  Share happiness​</p>
          </section>

          <section className="section2 flex items-center justify-center my-10 w-full mobile:my-4">
            <svg className="bg1 absolute my-6" xmlns='http://www.w3.org/2000/svg' width='100%'><defs><linearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%' gradientTransform='rotate(240)'><stop offset='0' stop-color='#ffffff'/><stop offset='1' stop-color='#4FE'/></linearGradient><pattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'><g fill-opacity='0.1'><polygon fill='#444' points='90 150 0 300 180 300'/><polygon points='90 150 180 0 0 0'/><polygon fill='#AAA' points='270 150 360 0 180 0'/><polygon fill='#DDD' points='450 150 360 300 540 300'/><polygon fill='#999' points='450 150 540 0 360 0'/><polygon points='630 150 540 300 720 300'/><polygon fill='#DDD' points='630 150 720 0 540 0'/><polygon fill='#444' points='810 150 720 300 900 300'/><polygon fill='#FFF' points='810 150 900 0 720 0'/><polygon fill='#DDD' points='990 150 900 300 1080 300'/><polygon fill='#444' points='990 150 1080 0 900 0'/><polygon fill='#DDD' points='90 450 0 600 180 600'/><polygon points='90 450 180 300 0 300'/><polygon fill='#666' points='270 450 180 600 360 600'/><polygon fill='#AAA' points='270 450 360 300 180 300'/><polygon fill='#DDD' points='450 450 360 600 540 600'/><polygon fill='#999' points='450 450 540 300 360 300'/><polygon fill='#999' points='630 450 540 600 720 600'/><polygon fill='#FFF' points='630 450 720 300 540 300'/><polygon points='810 450 720 600 900 600'/><polygon fill='#DDD' points='810 450 900 300 720 300'/><polygon fill='#AAA' points='990 450 900 600 1080 600'/><polygon fill='#444' points='990 450 1080 300 900 300'/><polygon fill='#222' points='90 750 0 900 180 900'/><polygon points='270 750 180 900 360 900'/><polygon fill='#DDD' points='270 750 360 600 180 600'/><polygon points='450 750 540 600 360 600'/><polygon points='630 750 540 900 720 900'/><polygon fill='#444' points='630 750 720 600 540 600'/><polygon fill='#AAA' points='810 750 720 900 900 900'/><polygon fill='#666' points='810 750 900 600 720 600'/><polygon fill='#999' points='990 750 900 900 1080 900'/><polygon fill='#999' points='180 0 90 150 270 150'/><polygon fill='#444' points='360 0 270 150 450 150'/><polygon fill='#FFF' points='540 0 450 150 630 150'/><polygon points='900 0 810 150 990 150'/><polygon fill='#222' points='0 300 -90 450 90 450'/><polygon fill='#FFF' points='0 300 90 150 -90 150'/><polygon fill='#FFF' points='180 300 90 450 270 450'/><polygon fill='#666' points='180 300 270 150 90 150'/><polygon fill='#222' points='360 300 270 450 450 450'/><polygon fill='#FFF' points='360 300 450 150 270 150'/><polygon fill='#444' points='540 300 450 450 630 450'/><polygon fill='#222' points='540 300 630 150 450 150'/><polygon fill='#AAA' points='720 300 630 450 810 450'/><polygon fill='#666' points='720 300 810 150 630 150'/><polygon fill='#FFF' points='900 300 810 450 990 450'/><polygon fill='#999' points='900 300 990 150 810 150'/><polygon points='0 600 -90 750 90 750'/><polygon fill='#666' points='0 600 90 450 -90 450'/><polygon fill='#AAA' points='180 600 90 750 270 750'/><polygon fill='#444' points='180 600 270 450 90 450'/><polygon fill='#444' points='360 600 270 750 450 750'/><polygon fill='#999' points='360 600 450 450 270 450'/><polygon fill='#666' points='540 600 630 450 450 450'/><polygon fill='#222' points='720 600 630 750 810 750'/><polygon fill='#FFF' points='900 600 810 750 990 750'/><polygon fill='#222' points='900 600 990 450 810 450'/><polygon fill='#DDD' points='0 900 90 750 -90 750'/><polygon fill='#444' points='180 900 270 750 90 750'/><polygon fill='#FFF' points='360 900 450 750 270 750'/><polygon fill='#AAA' points='540 900 630 750 450 750'/><polygon fill='#FFF' points='720 900 810 750 630 750'/><polygon fill='#222' points='900 900 990 750 810 750'/><polygon fill='#222' points='1080 300 990 450 1170 450'/><polygon fill='#FFF' points='1080 300 1170 150 990 150'/><polygon points='1080 600 990 750 1170 750'/><polygon fill='#666' points='1080 600 1170 450 990 450'/><polygon fill='#DDD' points='1080 900 1170 750 990 750'/></g></pattern></defs><rect x='0' y='0' fill='url(#a)' width='100%' height='100%'/><rect x='0' y='0' fill='url(#b)' width='100%' height='100%'/>              
            </svg>
            <div className="block pt-8"> 
                <p className="text-5xl text-center w-2/3 z-0 relative mx-auto mobile:pt-8 mobile:text-3xl mobile:w-4/5"> “I could either watch it happen or be a part of it.”</p>        
                  <p className="text-2xl text-right mr-64 z-0 relative mobile:text-xl mobile:mr-auto mobile:pt-2">- Elon Musk</p>
            </div>
          </section>

          <section className="h-full mt-4 mb-4 pt-8 mobile:pt-4 ">
            <Section4/>
          </section>

          <section className="h-72 w-full my-4 flex items-center justify-center mobile:w-full">
            <img className="bg2 absolute"></img>
            <div className="block">
              <h1 className="text-center text-4xl z-0 relative mx-auto mobile:text-3xl ">Inform | Engage | Inspire​</h1> 
            </div>
          </section>

          <section className="h-full pb-2">
            <h1 className="text-center text-4xl w-1/2 mx-auto my-1 mobile:text-2xl mobile:w-3/4">Interested in building amazing things? Join us​</h1>
            <p className="mx-auto my-2 text-center text-xl">See all our current open positions​</p>
            <div className="text-center ml-48 mobile:ml-2 mobile:pt-2 mobile:pb-4 ">
              <p className="text-sm text-gray-400 w-4/5 mobile:w-full">Our employee’s safety is our priority; hence all positions are being offered in work from home setup only. 
              Please send your resumes to <a href="#" className="text-blue-600 underline">contact@nuzpapr.com</a></p>
            </div>
            
            <div className="w-full px-4 mobile:pb-1 mobile:mb-1">
              <div className="w-2/3 p-2 mx-auto bg-white rounded-2xl mobile:mx-4">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium 
                      text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 
                      focus:outline-none focus-visible:ring focus-visible:ring-purple-500 
                      focus-visible:ring-opacity-75 mobile:w-80">
                        <span>Software Engineer – Frontend ​</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <Position1/>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure as="div" className="mt-2">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm 
                      font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 
                      focus:outline-none focus-visible:ring focus-visible:ring-purple-500 
                      focus-visible:ring-opacity-75 mobile:w-80 ">
                        <span>AI/ML Engineer</span>
                        <ChevronUpIcon
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <Position2/>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div> 
          </section>       

          <section className="mt-4 pt-8 flex h-72 mobile:h-full" >
            <img className="bg3 absolute mobile:h-full"></img>
          
              <div className="block py-5 text-white z-0 relative text-center">
                <div className="text-4xl w-4/5 ml-44 mobile:text-xl mobile:ml-10">
                  <h1>Want news come to you? ​</h1>
                  <h1>Subscribe to our newsletter, get latest & greatest updates on news, contests &​​ prizes</h1> 
                </div>
                
                <form onSubmit={handleSubmit} className="py-8 mobile:py-8 laptop:py-4">
                  <input className="h-10 rounded-md border px-4" type="text" name="email" placeholder="Enter your email Id" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                  <button type="submit" className=" h-10 w-36 rounded-md border border-transparent bg-purple-800">Subscribe</button>
                </form>
              </div>
          </section>

          <footer className="pt-8 flex justify-between w-full mobile:pt-4">
            
            <div className="block px-8">
              <div className="py-2 "><p className="text-3xl mobile:text-2xl">Nuzpapr.com</p></div>
              <div className="py-2 "><a href="#" className="text-blue-600 underline">contact@nuzpapr.com</a></div>
              <div className="pt-8 mobile:pt-20 ">© All rights reserved 2021 </div>
            </div>

            <div className="px-8 text-sm ">
              <div className="py-1"><a href="#">Terms & Conditions</a></div>
              <div className="py-1"><a href="#">User agreement</a></div>
              <div className="py-1"><a href="#">Privacy policy</a></div>
              <div className="py-1"><a href="#">Content policy</a></div>
              <div className="py-1"><a href="#">Takedown policy</a></div>
            </div>
            
           </footer>

        </div>
      <div></div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      activeTab: '/about-us',
    },
  };
}

export default AboutUs;
