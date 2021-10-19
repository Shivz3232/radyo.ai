import React from 'react';
import AddAudio from '../../components/UserDashboard/AddAudio';
import Navbar from '../../components/UserDashboard/UserNavbar';
import nookies from 'nookies';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import { useRouter } from 'next/router';

const Audio = ({ redirect, props }) => {
  const router = useRouter();
  if (redirect) {
    router.push(redirect.destination);
  }

  const selectedTab = {
    profile: false,
    addAudio: true,
    mySubmission: false,
  };

  return (
    <div className="bg-gray-100">
      <Navbar selectedTab={selectedTab} />
      <AddAudio />
    </div>
  );
};

export const getServerSideProps = async context => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    if (uid) {
      console.log('User authenticated');
      return {
        props: {},
      };
    }
  } catch (err) {
    console.log('User not authenticated');
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
};

export default Audio;
