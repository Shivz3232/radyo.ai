import Head from 'next/head';
import 'react-h5-audio-player/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Header from '../components/Header/Header';
import '../styles/App.scss';
import '../styles/AboutUs.scss'
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
import '../styles/Leaderboard.scss'
import '../styles/PodcastCategory.scss';
import '../styles/PodcastPage.scss';
import '../styles/SearchBar.scss';
import '../styles/SearchResults.scss';
import '../styles/style.scss';
import '../styles/CategoryNavBar.scss';
function App({ Component, pageProps }) {
  return (
    <main className="app">
      <Head>
        <title>Radyo.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!pageProps.hideNavBar && (
        <Header activeTab={pageProps.activeTab} data={{ loggedIn: true }} />
      )}
      <Component {...pageProps} />
    </main>
  );
}

export default App;
