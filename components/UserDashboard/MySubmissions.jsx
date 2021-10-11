import React, { useEffect } from 'react';
import AudioCards from '../AudioCard/AudioCards';
import { useAuth } from '../../controllers/auth';
import axios from 'axios';

const MySubmissions = () => {
  const { useremail } = useAuth();

  useEffect(() => {
    if (useremail) {
      axios
        .get(`/api/getMySubmissions/${useremail}`)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <>
      <h1 className="text-center">
        If you have recently submitted an entry, it will be under review and
        will appear here within 2 business days​.
      </h1>
    </>
  );
};

export default MySubmissions;
