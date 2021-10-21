import React, { useState, useEffect } from 'react';
// import AdCard from '../../../components/AdCard/AdCard';
import AudioCards from '../../components/AudioCard/AudioCards';
import AudioCardsVerticalScroll from '../../components/AudioCard/AudioCardsVerticalScroll';
import AudioPageComponent from '../../components/AudioPage/AudioPage';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import { getAllAudio, getAudio, getAudioIds } from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';

const PodcastAudio = ({ data, audioCards, play }) => {
  useEffect(() => {
    initGA();
    trackPageView();
  }, []);

  return (
    <div className="audio-page" id="audioPage">
      <div className="container">
        <AudioPageComponent data={data} />

        <div className="heading">{`Other creations by ${data.creatorId.creatorName}`}</div>
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
    return {
      props: {
        data: data,
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
