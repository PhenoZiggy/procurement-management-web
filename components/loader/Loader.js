import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import loadingLottie from '../../public/lottie/loading.json';
import { userStore } from '../../store/storeInitialize';

const Loader = () => {
  const [loading, isLoading] = useState(false);
  useEffect(() => {
    isLoading(userStore.isLoading);
  }, [userStore.isLoading]);

  return (
    <div className={`absolute w-screen h-screen z-50 bg-[#ffffffa8] flex justify-center items-center ${!loading && 'hidden'}`}>
      <Lottie loop animationData={loadingLottie} play style={{ width: 'auto', height: 'auto' }} />
    </div>
  );
};

export default observer(Loader);
