import Loader from '../components/loader/Loader';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Loader />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
