import React from 'react';
import Submission from '../../components/UserDashboard/MySubmissions';
import Navbar from '../../components/UserDashboard/UserNavbar';
import nookies from 'nookies';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import { useRouter } from 'next/router';

const Submissions = ({ redirect, props }) => {
  const router = useRouter();
  if (redirect) {
    router.push(redirect.destination);
  }

  const selectedTab = {
    profile: false,
    addAudio: false,
    mySubmission: true,
  };

  return (
    <div className="bg-gray-100">
      <Navbar selectedTab={selectedTab} />
      <Submission />
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

export default Submissions;
