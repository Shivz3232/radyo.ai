import Head from 'next/head';
import { useRef, useState, useEffect } from 'react';
import 'react-h5-audio-player/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import Header from '../components/Header/Header';
import '../styles/App.scss';
import '../styles/AudioCard.scss';
import '../styles/AudioCardsVerticalScroll.scss';
import '../styles/AudioCategoryColors.scss';
import '../styles/AudioPage.scss';
import '../styles/AudioPageComponent.scss';
import '../styles/AudioPlayer.scss';
import '../styles/CategoryNavBar.scss';
import '../styles/CreatorCard.scss';
import '../styles/CreatorPage.scss';
import '../styles/global.css';
import '../styles/Leaderboard.scss';
import '../styles/PodcastCategory.scss';
import '../styles/PodcastPage.scss';
import '../styles/SearchBar.scss';
import '../styles/SearchResults.scss';
import '../styles/style.scss';
import '../styles/AdminAuthPage.scss';
import '../styles/AdminDashboard.scss';
import '../styles/PodcastReviewCard.scss';
import '../styles/welcomemodal.scss';
import { AuthProvider } from '../controllers/auth';

function App({ Component, pageProps }) {
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  const audioRef = useRef();

  const [playlist, setPlaylist] = useState([]);

  const playAudioP = info => {
    setTrackInfo(info);
    // console.log(audioRef.current.audio.current);
  };

  function setCurrentPlaylist(data) {
    setPlaylist(data);
  }

  function playNext() {
    // console.log(playlist);
    if (playlist.length)
      var index = playlist.findIndex(e => {
        if (e.title === trackInfo.title && e.audioSrc === trackInfo.audioSrc)
          return true;
        else return false;
      });
    if (playlist && index + 1 === playlist.length) {
      playAudioP({
        audioSrc: playlist[0].audioSrc,
        coverSrc: playlist[0].coverImage,
        title: playlist[0].title,
      });
    } else if (playlist && playlist[index]) {
      playAudioP({
        audioSrc: playlist[index + 1].audioSrc,
        coverSrc: playlist[index + 1].coverImage,
        title: playlist[index + 1].title,
      });
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.audio.current.addEventListener('ended', () => {
        console.log('audio ended');
        playNext();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackInfo]);

  return (
    <main className="app">
      <AuthProvider>
        <Head>
          <title>Radyo.ai</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header activeTab={pageProps.activeTab} data={{ loggedIn: false }} />
        <div className={trackInfo.audioSrc ? 'mb-16 mobile:mb-20' : 'm-0'}>
          <Component
            setPlaylist={setCurrentPlaylist}
            play={playAudioP}
            {...pageProps}
          />
        </div>
        <div
          // className="audio-player-dashboard"
          id="audio-player"
          className="absolute w-full bottom-0 left-0 z-20"
          style={{ display: trackInfo.audioSrc ? '' : 'none' }}
        >
          <AudioPlayer
            audioRef={audioRef}
            trackInfo={trackInfo}
            play={playAudioP}
          />
        </div>
      </AuthProvider>
    </main>
  );
}

export default App;
