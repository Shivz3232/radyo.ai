import React from 'react';

const Collections = () => {
  return <div>Collections page</div>;
};
export async function getStaticProps() {
  return {
    props: {
      activeTab: '/collections',
    },
  };
}
export default Collections;
