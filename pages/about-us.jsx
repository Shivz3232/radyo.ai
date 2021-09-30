import React from 'react';

const AboutUs = () => {
  return <div>About us page</div>;
};

export async function getStaticProps() {
  return {
    props: {
      activeTab: '/about-us',
    },
  };
}

export default AboutUs;
