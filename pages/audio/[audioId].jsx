import React, { useState } from 'react';
// import AdCard from '../../../components/AdCard/AdCard';
// import PillsNav from '../../../components/PillsNav/PillsNav';
import AudioCards from '../../components/AudioCard/AudioCards';
import AudioPageComponent from '../../components/AudioPage/AudioPage';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import { getAllAudio, getAudio, getAudioIds } from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';
// import Banner from '../../../components/Banner/Banner';

const PodcastAudio = ({ data, audioCards }) => {
  //   const data =  data;
  // console.log('data in page',  data);

  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  const playAudio = info => {
    setTrackInfo(info);
  };
  // console.log('Trackinfo in page ', trackInfo);

  return (
    <>
      <div className="audio-page" id="audioPage">
        {/* <Banner size="sm" /> */}
        {/* {<PillsNav category="all" type="podcast" />} */}

        <div className="container">
          <AudioPageComponent data={data} playAudio={playAudio} />

          {/*Audio Cards horizontal scroll section*/}
          {audioCards && (
            <AudioCards
              playAudio={playAudio}
              categoryName="You may also like"
              cardItems={audioCards.filter(e => e.category === data.category)}
            />
          )}

          <AudioCards
            playAudio={playAudio}
            categoryName={data.creatorId.creatorName}
            cardItems={audioCards.filter(
              e => e.creatorId.creatorName === data.creatorId.creatorName
            )}
          />
          {/*Audio Player Popup */}
          <div
            className="audio-player-dashboard"
            style={{ display: trackInfo.audioSrc ? '' : 'none' }}
          >
            {<AudioPlayer trackInfo={trackInfo} />}
          </div>
        </div>
      </div>
    </>
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
