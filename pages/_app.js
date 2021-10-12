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
import { PlaylistProvider } from '../controllers/PlaylistProvider';
import { AudioProvider } from '../controllers/AudioProvider';

function App({ Component, pageProps }) {
  const [trackInfo, setTrackInfo] = useState({
    audioSrc: '',
    coverSrc: '',
    title: '',
  });

  return (
    <main className="app">
      <PlaylistProvider>
        <AudioProvider>
          <AuthProvider>
            <Head>
              <title>Radyo.ai</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header
              activeTab={pageProps.activeTab}
              data={{ loggedIn: false }}
            />
            <div className={trackInfo.audioSrc ? 'mb-16 mobile:mb-20' : 'm-0'}>
              <Component {...pageProps} />
            </div>
            <div
              id="audio-player"
              className="absolute w-full bottom-0 left-0 z-20"
              style={{ display: trackInfo.audioSrc ? '' : 'none' }}
            >
              <AudioPlayer trackInfo={trackInfo} hidePlayer={setTrackInfo} />
            </div>
          </AuthProvider>
        </AudioProvider>
      </PlaylistProvider>
    </main>
  );
}

export default App;
