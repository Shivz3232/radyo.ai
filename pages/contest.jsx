import React from 'react';

const Contest = () => {
  return <div>contest page</div>;
};
export async function getStaticProps() {
  return {
    props: {
      activeTab: '/contest',
    },
  };
}
export default Contest;
