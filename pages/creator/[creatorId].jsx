import React, { useState } from 'react';
// import PillsNav from '../../components/PillsNav/PillsNav';
import AudioCards from '../../components/AudioCard/AudioCards';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
// import Banner from '../../components/Banner/Banner';
import CreatorCard from '../../components/Creator/CreatorCard';
import { getCreatorAudio, getCreatorIds } from '../../controllers/creator';
import { getAllAudio } from '../../controllers/podcast';
import dbConnect from '../../utils/dbConnect';

const CreatorPage = ({ info, audioCards }) => {
  const data = info;
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  const playAudio = info => {
    setTrackInfo(info);
  };
  //marginBottom for audio player
  return (
    <>
      <div
        className="creatorpage"
        style={{ marginBottom: trackInfo.audioSrc ? '85px' : '0px' }}
      >
        {/* <Banner size="sm" />
        {<PillsNav category="all" type="podcast" />} */}

        <div className="container">
          <div className="creatorcard">
            <CreatorCard data={data} />
          </div>

          {/*Audio Cards horizontal scroll section*/}
          {audioCards &&
            audioCards.filter(e => e.creatorId.creatorName === data.creatorName)
              .length && (
              <AudioCards
                playAudio={playAudio}
                categoryName="More by the creator"
                cardItems={audioCards.filter(
                  e => e.creatorId.creatorName === data.creatorName
                )}
              />
            )}
        </div>
      </div>
      <div
        className="audio-player-dashboard"
        style={{ display: trackInfo.audioSrc ? '' : 'none' }}
      >
        <AudioPlayer trackInfo={trackInfo} />
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const id = params.creatorId;
  await dbConnect();
  const data = await getCreatorAudio(id).catch(console.error);
  const audioCards = await getAllAudio().catch(console.error);
  //const user = JSON.stringify(data.allAudio[0]);
  if (audioCards && data) {
    // console.log('user', data);
    return {
      props: {
        info: data,
        audioCards,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export async function getStaticPaths() {
  await dbConnect();

  const ids = await getCreatorIds().catch(console.error);
  let paths = [];
  if (ids) {
    return {
      paths: ids.map(elem => {
        return { params: { creatorId: elem._id.toString() } };
      }),
      fallback: false,
    };
  } else {
    return {
      paths,
      fallback: false,
    };
  }
}

export default CreatorPage;
