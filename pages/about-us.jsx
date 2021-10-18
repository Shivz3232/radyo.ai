// import React, {useState} from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import { Disclosure } from '@headlessui/react'
// import { ChevronUpIcon } from '@heroicons/react/solid'
// import Section4 from '../components/About-Us/Section4'
// import Position1 from '../components/About-Us/Position1'
// import Position2 from '../components/About-Us/Position2'
// import sunTornada from '../assets/sun-tornado.svg'
// import dragonScales from '../assets/dragon-scales.svg'
// import axios from 'axios'
// import {useRouter} from 'next/router'
// const AboutUs = () => {
//   const [errors, setErrors]= useState();
//   const [email, setEmail]= useState('');

//   const postData = async (email)=>{
//     try{
//       const res = await axios.post('/api/subscribe', {email:email});
//       console.log("email ",res.json());

//     }catch(error){
//       setErrors('Failed to subscribe')
//     }
//   }

//   const handleSubmit =(e)=>{
//     e.preventDefault();
//     const errs= formValidate();
//     if(!errs){
//       postData(email)==true? setEmail(''): window.alert("Unable to post email")

//     }else{
//            setErrors({errs});
//      }

//   }

//   const formValidate =()=>{
//     let err={}
//     if(!email){
//       err.email="Email is required"
//     return err;
//     }
//   }
// import React, { useEffect } from 'react';
// import HomeCarousel from '../components/HomeCarousel/HomeCarousel';
// import { initGA, trackPageView } from '../components/Tracking/tracking';

// const AboutUs = () => {
//   useEffect(() => {
//     initGA();
//     trackPageView();
//   }, []);
//   return (
//     <>
//        <div className="about-us flex flex-wrap">

//           <section className="carousel-box mobile:w-full">
//             <Carousel
//             autoPlay
//             infiniteLoop
//             stopOnHover
//             emulateTouch
//             showThumbs={false}
//             >
//               <div className="max-h-80 flex flex-1 w-full items-center justify-center">
//                 <img src={ sunTornada.src} alt="carousel" className=" absolute"/>
//                 <p className="z-0 relative text-white text-left text-5xl py-20  w-3/4 mobile:text-3xl ml-64 mobile:mb-12 mobile:ml-10">We help <span className="text-blue-500">online </span><p className="text-blue-500">news publications</p> reach new heights </p>
//               </div>

//               <div className="max-h-30 flex flex-1 w-full items-center justify-center mobile:max-h-30">
//                 <img img src={ dragonScales.src} alt="carousel" className=" absolute"/>
//                 <p className="z-0 relative text-white text-center pt-12 tracking-wider text-4xl  w-1/2 mobile:text-2xl">Innovative minds leveraging technology to bring the best to a billion users​ </p>
//               </div>
//             </Carousel>
//           </section>

//           <section className="h-full mt-6 mb-2 flex flex-wrap mobile:my-2">
//             <blockquote>
//               <h1 className="text-5xl text-center w-2/3 mx-56 mobile:text-3xl mobile:mx-10 mobile:w-4/5 laptop:w-3/4 laptop:mx-40">AI-powered news aggregation presented with a <u>best in class</u> consumer experience</h1>
//             </blockquote>
//             <p class="text-lg font-normal w-full text-center mx-8 py-2 my-2 tracking-widest">
//             India’s fastest growing news aggregation platform that brings in high quality
//             news from trusted & authentic sources across India, empowering our readers to
//             consume and socialize content in their own language seamlessly.
//             </p>
//             <p className="text-lg font-normal text-center mx-auto mobile:text-base mobile:mx-auto">Read News &nbsp; &nbsp; |&nbsp;&nbsp;    Play games &nbsp;&nbsp;   |&nbsp;&nbsp;  Share happiness​</p>
//           </section>

//           <section className="section2 flex items-center justify-center my-10 w-full mobile:my-4">

//             </svg>
//             <div className="block pt-8">
//                 <p className="text-5xl text-center w-2/3 z-0 relative mx-auto mobile:pt-8 mobile:text-3xl mobile:w-4/5"> “I could either watch it happen or be a part of it.”</p>
//                   <p className="text-2xl text-right mr-64 z-0 relative mobile:text-xl mobile:mr-auto mobile:pt-2">- Elon Musk</p>
//             </div>
//           </section>

//           <section className="h-full mt-4 mb-4 pt-8 mobile:pt-4 ">
//             <Section4/>
//           </section>

//           <section className="h-72 w-full my-4 flex items-center justify-center mobile:w-full">
//             <img className="bg2 absolute"></img>
//             <div className="block">
//               <h1 className="text-center text-4xl z-0 relative mx-auto mobile:text-3xl ">Inform | Engage | Inspire​</h1>
//             </div>
//           </section>

//           <section className="h-full pb-2">
//             <h1 className="text-center text-4xl w-1/2 mx-auto my-1 mobile:text-2xl mobile:w-3/4">Interested in building amazing things? Join us​</h1>
//             <p className="mx-auto my-2 text-center text-xl">See all our current open positions​</p>
//             <div className="text-center ml-48 mobile:ml-2 mobile:pt-2 mobile:pb-4 ">
//               <p className="text-sm text-gray-400 w-4/5 mobile:w-full">Our employee’s safety is our priority; hence all positions are being offered in work from home setup only.
//               Please send your resumes to <a href="#" className="text-blue-600 underline">contact@nuzpapr.com</a></p>
//             </div>

//             <div className="w-full px-4 mobile:pb-1 mobile:mb-1">
//               <div className="w-2/3 p-2 mx-auto bg-white rounded-2xl mobile:mx-4">
//                 <Disclosure>
//                   {({ open }) => (
//                     <>
//                       <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium
//                       text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200
//                       focus:outline-none focus-visible:ring focus-visible:ring-purple-500
//                       focus-visible:ring-opacity-75 mobile:w-80">
//                         <span>Software Engineer – Frontend ​</span>
//                         <ChevronUpIcon
//                           className={`${
//                             open ? 'transform rotate-180' : ''
//                           } w-5 h-5 text-purple-500`}
//                         />
//                       </Disclosure.Button>
//                       <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
//                         <Position1/>
//                       </Disclosure.Panel>
//                     </>
//                   )}
//                 </Disclosure>
//                 <Disclosure as="div" className="mt-2">
//                   {({ open }) => (
//                     <>
//                       <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm
//                       font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200
//                       focus:outline-none focus-visible:ring focus-visible:ring-purple-500
//                       focus-visible:ring-opacity-75 mobile:w-80 ">
//                         <span>AI/ML Engineer</span>
//                         <ChevronUpIcon
//                           className={`${
//                             open ? 'transform rotate-180' : ''
//                           } w-5 h-5 text-purple-500`}
//                         />
//                       </Disclosure.Button>
//                       <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
//                         <Position2/>
//                       </Disclosure.Panel>
//                     </>
//                   )}
//                 </Disclosure>
//               </div>
//             </div>
//           </section>

//           <section className="mt-4 pt-8 flex h-72 mobile:h-full" >
//             <img className="bg3 absolute mobile:h-full"></img>

//               <div className="block py-5 text-white z-0 relative text-center">
//                 <div className="text-4xl w-4/5 ml-44 mobile:text-xl mobile:ml-10">
//                   <h1>Want news come to you? ​</h1>
//                   <h1>Subscribe to our newsletter, get latest & greatest updates on news, contests &​​ prizes</h1>
//                 </div>

//                 <form onSubmit={handleSubmit} className="py-8 mobile:py-8 laptop:py-4">
//                   <input className="h-10 rounded-md border px-4" type="text" name="email" placeholder="Enter your email Id" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
//                   <button type="submit" className=" h-10 w-36 rounded-md border border-transparent bg-purple-800">Subscribe</button>
//                 </form>
//               </div>
//           </section>

//           <footer className="pt-8 flex justify-between w-full mobile:pt-4">

//             <div className="block px-8">
//               <div className="py-2 "><p className="text-3xl mobile:text-2xl">Nuzpapr.com</p></div>
//               <div className="py-2 "><a href="#" className="text-blue-600 underline">contact@nuzpapr.com</a></div>
//               <div className="pt-8 mobile:pt-20 ">© All rights reserved 2021 </div>
//             </div>

//             <div className="px-8 text-sm ">
//               <div className="py-1"><a href="#">Terms & Conditions</a></div>
//               <div className="py-1"><a href="#">User agreement</a></div>
//               <div className="py-1"><a href="#">Privacy policy</a></div>
//               <div className="py-1"><a href="#">Content policy</a></div>
//               <div className="py-1"><a href="#">Takedown policy</a></div>
//             </div>

//            </footer>

//         </div>
//       <div></div>
//     </>
//   );
// };

// export async function getStaticProps() {
//   return {
//     props: {
//       activeTab: 'about-us',
//     },
//   };
// }

// export default AboutUs;

import React from 'react';

const AboutUs = () => {
  return <div>about us</div>;
};

export default AboutUs;
