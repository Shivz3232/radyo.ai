import React, { useState, useEffect } from 'react';
// import AdCard from '../../../components/AdCard/AdCard';
import AudioCards from '../../components/AudioCard/AudioCards';
import AudioPageComponent from '../../components/AudioPage/AudioPage';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import { useAudio } from '../../controllers/AudioProvider';
import { getAllAudio, getAudio, getAudioIds } from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';

const PodcastAudio = ({ data, audioCards, play }) => {
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  //to fix the audio player to bottom after it has been rendered on this page
  useEffect(() => {
    const player = document.querySelector('#audio-player');
    player.classList.remove('absolute');
    player.classList.add('fixed');
  }, []);

  return (
    <div className="audio-page" id="audioPage">
      <div className="container">
        <AudioPageComponent data={data} />

        {/*Audio Cards horizontal scroll section*/}
        {audioCards && (
          <AudioCards
            categoryName="You may also like"
            cardItems={audioCards.filter(e => e.category === data.category)}
          />
        )}

        <AudioCards
          categoryName={`Other creations by ${data.creatorId.creatorName}`}
          cardItems={audioCards.filter(
            e => e.creatorId.creatorName === data.creatorId.creatorName
          )}
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
    };
  } else {
    return {
      props: {},
    };
  }
}

export async function getStaticPaths() {
  await dbConnect();

  const ids = await getAudioIds().catch(console.error);
  let paths = [];
  if (ids && typeof ids[0] === 'string') {
    paths = ids.map(elem => {
      console.log(elem);
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
