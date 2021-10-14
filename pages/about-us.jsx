import React, { useEffect } from 'react';
import HomeCarousel from '../components/HomeCarousel/HomeCarousel';
import { initGA, trackPageView } from '../components/Tracking/tracking';

const AboutUs = () => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      activeTab: 'about-us',
    },
  };
}

export default AboutUs;
