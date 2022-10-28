import Loader from '../components/loader/Loader';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Loader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
