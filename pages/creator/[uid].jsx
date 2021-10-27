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
import { FACEBOOK_APP_ID } from '../../constants';
import axios from 'axios';
import { initGA, trackPageView } from '../../components/Tracking/tracking';

const getFollowerList = async (
  creatorId,
  setFollowers,
  setFollowing,
  userid
) => {
  const data = {
    creatorId: creatorId,
  };
  await axios({
    method: 'POST',
    url: '/api/getFollowers',
    data: data,
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      setFollowers(res.data.followers);
      setFollowing(
        findFollower(res.data.followers, userid) >= 0 ? true : false
      );
    })
    .catch(error => {
      console.log('Error getting follower list.');
    });
};

const CreatorPage = props => {
  const [data, setData] = useState(props.info);
  const [audioCards, setAudioCards] = useState(props.audioCards);
  const { useremail } = useAuth();
  const [userid, setUserid] = useState('');
  const [followers, setFollowers] = useState(data.followers);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/hydrate/creator/get_creator?creatorId=${data._id}`)
      .then(res => {
        // console.log(res.data.allCreator[0]);
        if (res.data.allCreator && res.data.allCreator.length) {
          setData(res.data.allCreator[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`/api/hydrate/audio/get_audio`)
      .then(res => {
        // console.log(res.data.allAudio[0]);
        if (res.data.allAudio && res.data.allAudio.length) {
          setAudioCards(res.data.allAudio);
        }
      })
      .catch(err => {
        console.log(err);
      });

    initGA();
    trackPageView();
  }, [data._id]);

  useEffect(() => {
    getFollowerList(data.uid, setFollowers, setFollowing, userid);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(() => {
      if (useremail) {
        setUserid(useremail.split('@')[0]);
        setFollowing(findFollower(followers, userid) >= 0 ? true : false);
      }
    });
  });

  return (
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

        <div className="heading">{`All creations by ${data.creatorName}`}</div>
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
  );
};

export const getStaticProps = async ({ params }) => {
  const id = params.uid;
  await dbConnect();
  const data = await getCreatorAudio(id).catch(console.error);
  const audioCards = await getAllAudio().catch(console.error);
  if (audioCards && data) {
    const metaTags = [
      // { name: 'og:url', content: window.location.href },
      {
        name: 'fb:app_id',
        content: FACEBOOK_APP_ID,
      },
      {
        name: 'og:image',
        content: data.avatarImage,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content: data.avatarImage,
      },
      {
        name: 'og:title',
        content: `Radyo.ai | ${data.creatorName}`,
      },
      {
        name: 'description',
        content: `Radyo.ai | ${data.creatorName}`,
      },
      {
        name: 'og:description',
        content: `Radyo.ai | ${data.creatorName}`,
      },
      {
        name: 'og:type',
        content: 'audio',
      },
    ];

    return {
      props: {
        info: data,
        audioCards,
        metaTags,
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
