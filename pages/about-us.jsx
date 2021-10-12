import React from 'react';
import HomeCarousel from '../components/HomeCarousel/HomeCarousel';

const AboutUs = () => {
  return (
    <>
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
