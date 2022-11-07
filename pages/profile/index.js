import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/pagelayout/PageLayout';
import { userStore } from '../../store/storeInitialize';

const Index = () => {
  const [userData, setUserData] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAnddress] = useState('');
  const [apmt, setApmt] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postal, setPostal] = useState('');
  const [phone, setPhone] = useState('');
  const [imageurl, setImageUrl] = useState();

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

  useEffect(() => {
    if (!userStore.currentUser) {
      getUser();
    }
    if (userStore.currentUser?.data) {
      setUserData(userStore.currentUser.data.response);
    } else {
      setUserData(null);
    }
  }, [userStore.currentUser]);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setImageUrl(userData.image);
      if (userData.address) {
        setAnddress(userData.address.address);
        setApmt(userData.address.apmt);
      }
    }
  }, [userData]);
  return (
    <PageLayout>
      <div className="flex flex-col h-full justify-center items-center space-y-5">
        <form className="space-y-6 md:w-2/3" action="#" method="POST">
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-500">This information will be displayed publicly so be careful what you share.</p>
              </div>
              <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center space-x-5">
                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <img src={imageurl?.url} />
                    </span>
                    <button
                      type="button"
                      className="rounded-md border border-yello-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={name}
                    className="mt-1 block w-full py-2 rounded-md border border-yellow-300 px-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    value={userData?.email}
                    className="mt-1 block w-full py-2 rounded-md border px-2 border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        value={address}
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="street-address"
                        className="block w-full py-2 rounded-md border px-2 border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
                      Apartment, suite, etc.
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="apartment"
                        id="apartment"
                        className="block w-full py-2 rounded-md  border px-2 border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full py-2 rounded-md  border px-2 border-yellow-300  shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="block py-2 w-full rounded-md  border px-2 border-yellow-300  shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full py-2 rounded-md  border px-2 border-yellow-300  shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="block w-full py-2 rounded-md  border px-2 border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end py-5">
              <button
                type="button"
                className="rounded-md   border border-yellow-300  bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <form className="space-y-6 md:w-2/3" action="#" method="POST">
          <div className="bg-white px-4 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Password</h3>
                <p className="mt-1 text-sm text-gray-500">Change Your Password</p>
              </div>
              <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 block w-full py-2 rounded-md border border-yellow-300 px-2 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full py-2 rounded-md border px-2 border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                    Re-type New Password
                  </label>
                  <input
                    type="password"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 block w-full py-2 rounded-md border px-2 border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end py-5">
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default observer(Index);
