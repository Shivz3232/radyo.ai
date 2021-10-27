import React, { useState, useEffect } from 'react';
// import AdCard from '../../../components/AdCard/AdCard';
import AudioCards from '../../components/AudioCard/AudioCards';
import AudioCardsVerticalScroll from '../../components/AudioCard/AudioCardsVerticalScroll';
import AudioPageComponent from '../../components/AudioPage/AudioPage';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import { getAllAudio, getAudio, getAudioIds } from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';
import { FACEBOOK_APP_ID } from '../../constants';
import axios from 'axios';
import { usePlaylist } from './../../controllers/PlaylistProvider';

const PodcastAudio = props => {
  const { audioCards } = props;
  const [data, setData] = useState(props.data);
  const { playAudio } = usePlaylist();
  useEffect(() => {
    axios
      .get(`/api/hydrate/audio/get_audio?audioId=${props.data._id}`)
      .then(res => {
        // console.log(res.data.allAudio[0]);
        if (res.data.allAudio && res.data.allAudio.length) {
          setData(res.data.allAudio[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
    initGA();
    trackPageView();
  }, [props.data._id]);

  useEffect(() => {
    if (window.location.hash === '#play' && data) {
      playAudio(
        {
          audioSrc: data.audioSrc,
          coverSrc: data.coverImage,
          title: data.title,
        },
        data._id
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="audio-page" id="audioPage">
      <div className="container">
        {data && <AudioPageComponent data={data} />}

        <div className="heading">
          {data && `Other creations by ${data.creatorId.creatorName}`}
        </div>
        {audioCards && (
          <AudioCardsVerticalScroll
            audioCards={audioCards.filter(
              e => e.creatorId.creatorName === data.creatorId.creatorName
            )}
          />
        )}
        <div className="heading" style={{ marginTop: '2rem' }}>
          You may also like
        </div>
        <AudioCardsVerticalScroll
          audioCards={audioCards.filter(e => e.category === data.category)}
        />
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  await dbConnect();
  const data = await getAudio(params.audioId).catch(console.error);
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
        content: data.coverImage,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content: data.coverImage,
      },
      {
        name: 'og:title',
        content: `Radyo.ai | ${data.title}`,
      },
      {
        name: 'description',
        content: `Radyo.ai | ${data.title}`,
      },
      {
        name: 'og:description',
        content: `Radyo.ai | ${data.title}`,
      },
      {
        name: 'og:type',
        content: 'audio',
      },
    ];

    return {
      props: {
        data: data,
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
}

export async function getStaticPaths() {
  await dbConnect();

  const ids = await getAudioIds().catch(console.error);
  let paths = [];
  if (ids && typeof ids[0] === 'string') {
    paths = ids.map(elem => {
      // console.log(elem);
      return { params: { audioId: elem._id } };
    });
    return {
      paths: paths,
      fallback: 'blocking',
    };
  } else {
    return {
      paths,
      //////////////fall back false not working
      fallback: 'blocking',
    };
  }
}

export default PodcastAudio;
