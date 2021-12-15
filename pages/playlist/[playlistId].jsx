import React, { useState, useEffect } from 'react';
import PlaylistCardsVerticalScroll from '../../components/PlaylistCard/PlaylistCardsVerticalScroll';
import PlaylistPageComponent from '../../components/PlaylistCard/PlaylistPage';
import { initGA, trackPageView } from '../../components/Tracking/tracking';
import {
  getUserPlaylists,
  getTrendingPlaylists,
  getPlaylist,
  getPlaylistIds,
} from '../../controllers/playlist';
import dbConnect from '../../utils/dbConnect';
import { FACEBOOK_APP_ID } from '../../constants';
import axios from 'axios';
import { usePlaylist } from './../../controllers/PlaylistProvider';

const PlaylistInfoPage = props => {
  const { playlistCards, trendingPlaylistCards } = props;
  const [data, setData] = useState(props.data);
  const { playAudio } = usePlaylist();
  useEffect(() => {
    axios
      .get(`/api/hydrate/audio/get_audio?audioId=${props.data._id}`)
      .then(res => {
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
      // console.log(data);
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
        {data && <PlaylistPageComponent data={data} />}

        <div className="heading">
          {data && `All playlists by ${data.creatorId.creatorName}`}
        </div>
        <PlaylistCardsVerticalScroll playlistCards={playlistCards} />
        <div className="heading" style={{ marginTop: '2rem' }}>
          You may also like
        </div>
        <PlaylistCardsVerticalScroll playlistCards={trendingPlaylistCards} />
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  await dbConnect();
  const data = await getPlaylist(params.playlistId).catch(console.error);
  const playlistCards = await getUserPlaylists(data.creatorId._id).catch(
    console.error
  );
  const trendingPlaylistCards = await getTrendingPlaylists().catch(
    console.error
  );
  if (playlistCards && data) {
    const metaTags = [
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
        playlistCards,
        trendingPlaylistCards,
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

  const ids = await getPlaylistIds().catch(console.error);
  let paths = [];
  if (ids && typeof ids[0] === 'string') {
    paths = ids.map(elem => {
      return { params: { playlistId: elem._id } };
    });
    return {
      paths: paths,
      fallback: 'blocking',
    };
  } else {
    return {
      paths,
      fallback: 'blocking',
    };
  }
}

export default PlaylistInfoPage;
