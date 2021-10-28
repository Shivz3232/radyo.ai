import React, { useEffect } from 'react';
import MyPlaylists from '../../components/UserDashboard/MyPlaylists';
import Navbar from '../../components/UserDashboard/UserNavbar';
import nookies from 'nookies';
//import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
//import { useRouter } from 'next/router';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
//import { getUserPlaylist } from '../api/getUserPlaylist';

const Playlists = ({ redirect, props }) => {
  const router = useRouter();
  if (redirect) {
    router.push(redirect.destination);
  }

  const selectedTab = {
    profile: false,
    addAudio: false,
    mySubmission: false,
    myPlaylists: true,
  };
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar selectedTab={selectedTab} />
      <MyPlaylists />
    </div>
  );
};
/*
export const getStaticProps = async context => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    if (uid) {
      console.log('User authenticated');
      const playlistData = await getUserPlaylists().catch(console.error);

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
*/
export default Playlists;
