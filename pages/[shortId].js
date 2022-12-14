import React from 'react';
import dbConnect from '../utils/dbConnect';
import { getAudioId } from '../controllers/podcast';
import { useRouter } from 'next/router';

const ShortId = ({ redirect, props }) => {
  const router = useRouter();

  if (redirect) {
    router.push(redirect.destination);
  }
  return <></>;
};

export default ShortId;

export const getServerSideProps = async ({ params }) => {
  await dbConnect();
  const id = await getAudioId(params.shortId);
  if (id) {
    return {
      redirect: {
        permanent: false,
        destination: `/audio/${id[0]._id}#play`,
      },
      props: {},
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }
};
