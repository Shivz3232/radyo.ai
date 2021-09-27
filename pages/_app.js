import Head from 'next/head';
import Header from '../components/Header/Header';
import '../styles/App.scss';
import '../styles/AudioCard.scss';
import '../styles/AudioCardsVerticalScroll.scss';
import '../styles/global.css';
import '../styles/style.scss';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>radyo.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
        {!pageProps.hideNavBar && <Header />}
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default App;
