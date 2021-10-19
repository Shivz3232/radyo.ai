import React, { useEffect, useState } from 'react';
import AudioCardsVerticalScroll from '../AudioCard/AudioCardsVerticalScroll';
import { useAuth } from '../../controllers/auth';
import axios from 'axios';
import Link from 'next/link';

const MySubmissions = () => {
  const { useremail } = useAuth();
  const [audioCards, setAudioCards] = useState([]);
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  useEffect(() => {
    if (useremail) {
      axios
        .get(`/api/getMySubmissions/${useremail}`)
        .then(response => setAudioCards(response.data))
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <>
      <div className="h-screen">
        <h1 className="text-center px-2">
          If you have recently submitted an entry, it will be under review and
          will appear here within 2 business days​.
        </h1>
        <div className="text-indigo-650 text-center text-xl m-10">
          My Submissions
        </div>
        <div className="container">
          {/* <AudioCards
            categoryName="My Submissions"
            cardItems={audioCards}
            playAudio={playAudio}
          /> */}

          {/* Play Audio Functionality not added */}
          <AudioCardsVerticalScroll audioCards={audioCards} />
        </div>
        {audioCards && (
          <h1 className="text-center text-xl mt-10">
            Comeon, share your creativity,{' '}
            <Link href="/user/addAudio">
              <a className="text-blue-600">upload</a>
            </Link>{' '}
            an audio now
          </h1>
        )}
      </div>
    </>
  );
};

export default MySubmissions;
