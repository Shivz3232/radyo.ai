import Head from 'next/head';
import Header from '../components/Header/Header';
import '../styles/App.scss';
import '../styles/AudioCard.scss';
import '../styles/AudioCardsVerticalScroll.scss';
import '../styles/global.css';
import '../styles/style.scss';
import '../styles/PodcastPage.scss';
import '../styles/AudioCategoryColors.scss';
import '../styles/SearchBar.scss';
import '../styles/SearchResults.scss';

function App({ Component, pageProps }) {
  return (
    <main>
      <Head>
        <title>radyo.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!pageProps.hideNavBar && <Header />}
      <Component {...pageProps} />
    </main>
  );
}

export default App;
