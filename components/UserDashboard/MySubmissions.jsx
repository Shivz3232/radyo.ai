import React, { useEffect, useState } from 'react';
import AudioCards from '../AudioCard/AudioCards';
import { useAuth } from '../../controllers/auth';
import axios from 'axios';

const MySubmissions = () => {
  const { useremail } = useAuth();
  const [audioCards, setAudioCards] = useState([]);
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  const playAudio = info => {
    setTrackInfo(info);
    play(info);
  };

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
      <h1 className="text-center px-2">
        If you have recently submitted an entry, it will be under review and
        will appear here within 2 business days​.
      </h1>
      <div className="container">
        <AudioCards
          categoryName="My Submissions"
          cardItems={audioCards}
          playAudio={playAudio}
        />
      </div>
    </>
  );
};

export default MySubmissions;
