import React, { useEffect } from 'react';
import Navbar from '../../components/UserDashboard/UserNavbar';
import { useRouter } from 'next/router';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import dbConnect from '../../utils/dbConnect';
import { getCreatorInfo } from '../../controllers/creator';
import { getUserPlaylists } from '../../controllers/playlist';
import PlaylistAccordian from '../../components/PlaylistCard/PlaylistAccordian';
import nookies from 'nookies';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import { Accordion } from 'react-accessible-accordion';

const Playlists = ({ playlistData }) => {
  const router = useRouter();
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
    <div className="bg-gray-100 h-screen">
      <Navbar selectedTab={selectedTab} />
      <div className="bg-white w-6/12 px-4 py-5 mx-auto">
        <div className="px-4 py-5 sm:px-0 mx-auto rounded-md">
          {playlistData.length ? (
            <Accordion>
              {playlistData.map((key, elem) => {
                return (
                  <PlaylistAccordian key={key} data={playlistData[elem]} />
                );
              })}
            </Accordion>
          ) : (
            <div className="bg-white w-6/12 px-4 py-5 mx-auto">
              <div className="px-4 py-5 sm:px-0 mx-auto rounded-md text-center">
                No Playlist available
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const { email } = await verifyIdToken(cookies.token);
  await dbConnect();
  const userData = await getCreatorInfo(email).catch(console.error);
  const playlistData = await getUserPlaylists(userData._id).catch(
    console.error
  );
  if (playlistData) {
    return {
      props: {
        playlistData,
      },
    };
  } else {
    return {
      props: {},

      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
}

export default Playlists;
