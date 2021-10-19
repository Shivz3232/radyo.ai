import React, { useState } from 'react';
import MyProfile from '../../components/UserDashboard/MyProfile';
import Navbar from '../../components/UserDashboard/UserNavbar';
import nookies from 'nookies';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import { useRouter } from 'next/router';

const Profile = ({ redirect, props }) => {
  const router = useRouter();
  if (redirect) {
    router.push(redirect.destination);
  }

  const selectedTab = {
    profile: true,
    addAudio: false,
    mySubmission: false,
  };

  return (
    <div className="bg-gray-100">
      <Navbar selectedTab={selectedTab} />
      <MyProfile />
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

export default Profile;
