import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { observer } from 'mobx-react-lite';
import { userStore } from '../../store/storeInitialize';
import { useRouter } from 'next/router';

const User = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const router = useRouter();
  const [userData, setUserData] = useState();

  const routeToLogin = () => {
    router.push('/sign');
  };

  const getUser = async () => {
    const Refresh = localStorage.getItem('refreshToken');
    try {
      if (Refresh) {
        const response = userStore.setCurretUser();
      } else {
        localStorage.clear();
      }
    } catch (error) {}
  };

  const signOutHandler = () => {
    try {
      userStore.logOutUser();
    } catch (error) {}
  };

  useEffect(() => {
    if (!userStore.currentUser) {
      getUser();
    }
    if (userStore.currentUser?.data) {
      setUserData(userStore.currentUser.data.response);
      console.log(userData?.image.url);
    } else {
      setUserData(null);
    }
  }, [userStore.currentUser, userStore.currentUser]);

  return (
    <Menu as="div" className="relative ml-3">
      <div className="flex justify-center items-center space-x-3">
        <Menu.Button className="flex text-sm focus:outline-none  items-center">
          {userData && (
            <>
              <img className="h-8 w-8 rounded-full" src={userData?.image.url} alt="" width="40" height="40" />
              <span className="text-lg px-3">Hello,</span>
              <span className="text-lg capitalize">{userData.name}</span>
            </>
          )}
          {!userData && (
            <div className="font-bold hover:scale-105 duration-300" onClick={routeToLogin}>
              Sign in
            </div>
          )}
        </Menu.Button>
      </div>
      {userData && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-yellow-200 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                  Your Profile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                  Settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button onClick={signOutHandler} className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-full text-left')}>
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default observer(User);
