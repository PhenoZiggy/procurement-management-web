import Loader from '../components/loader/Loader';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userStore } from '../store/storeInitialize';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Home from './index';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState();
  const [role, setRole] = useState('user');
  useEffect(() => {
    if (userStore.currentUser?.data) {
      setUser(userStore.currentUser?.data.response);
    }
  }, [userStore.currentUser]);

  useEffect(() => {
    if (user) {
      const found = user?.role.find((element) => element == 'admin');
      setRole(found);
    }
  }, [user]);

  let allowed = true;
  if (router.pathname.startsWith('/products') && role !== 'admin') {
    allowed = false;
  }
  const ComponentToRender = allowed ? Component : Home;
  return (
    <>
      <Loader />
      <ComponentToRender {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default observer(MyApp);
