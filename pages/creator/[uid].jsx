import React, { useState, useEffect } from 'react';
// import PillsNav from '../../components/PillsNav/PillsNav';
import AudioCardsVerticalScroll from '../../components/AudioCard/AudioCardsVerticalScroll';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
// import Banner from '../../components/Banner/Banner';
import CreatorCard from '../../components/Creator/CreatorCard';
import { getCreatorAudio, getCreatorIds } from '../../controllers/creator';
import { getAllAudio } from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';
import nookies from 'nookies';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuth } from '../../controllers/auth';
import { findFollower } from '../../utils/findFollower';

const CreatorPage = ({ info, audioCards, play }) => {
  const data = info;
  const { useremail } = useAuth();
  const [userid, setUserid] = useState('');
  const [followers, setFollowers] = useState(data.followers);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(() => {
      if (useremail) {
        setUserid(useremail.split('@')[0]);
        setFollowing(findFollower(followers, userid) >= 0 ? true : false);
      }
    });
  });
  return (
    <>
      <div className="creatorpage">
        <div className="container">
          <div className="creatorcard">
            <CreatorCard
              data={data}
              creatorPlaylist={audioCards.filter(
                e => e.creatorId.creatorName === data.creatorName
              )}
              userid={userid}
              following={following}
              setFollowing={setFollowing}
              followers={followers}
              setFollowers={setFollowers}
            />
          </div>

          <div className="heading">{`Other creations by ${data.creatorName}`}</div>
          {audioCards &&
          audioCards.filter(e => e.creatorId.creatorName === data.creatorName)
            .length ? (
            <AudioCardsVerticalScroll
              audioCards={audioCards.filter(
                e => e.creatorId.creatorName === data.creatorName
              )}
            />
          ) : null}
          <div
            className="heading"
            style={{ marginTop: '2rem' }}
          >{`Trending Audios`}</div>
          {audioCards && (
            <AudioCardsVerticalScroll
              //most view in last 5 days logic here
              audioCards={audioCards.slice(0, 15)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const id = params.uid;
  await dbConnect();
  const data = await getCreatorAudio(id).catch(console.error);
  const audioCards = await getAllAudio().catch(console.error);
  if (audioCards && data) {
    return {
      props: {
        info: data,
        audioCards,
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {},
      revalidate: 60,
    };
  }
};

export async function getStaticPaths() {
  await dbConnect();
  const uid = await getCreatorIds().catch(console.error);
  let paths = [];
  if (uid && typeof uid[0].uid === 'string') {
    return {
      paths: uid.map(elem => {
        if (elem.uid) {
          return { params: { uid: elem.uid } };
        }
      }),
      fallback: 'blocking',
    };
  } else {
    return {
      paths,
      fallback: 'blocking',
    };
  }
}

export default CreatorPage;
