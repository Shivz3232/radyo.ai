import Head from 'next/head';
import { Header } from '../components/Header/Header';
import '../styles/style.scss';

function App({ Component, pageProps }) {
  return (
    <main className="app">
      <Head>
        <title>radyo.ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </main>
  );
}

export default App;
