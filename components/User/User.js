import React from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import Link from 'next/link';
import Image from 'next/image';

const User = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <Menu as="div" className="relative ml-3">
      <div className="flex justify-center items-center space-x-3">
        <Menu.Button className="flex text-sm focus:outline-none  items-center">
          <Image className="h-8 w-8 rounded-full" src="/img/avatar.jpg" alt="" width="40" height="40" />
          <span className="font-bold hover:scale-105 duration-300">Sign in</span>
        </Menu.Button>
      </div>
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
              <a href="#" className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default User;
