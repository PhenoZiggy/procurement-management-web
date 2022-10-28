import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '../../public/img/Shopify-Logo.png';

const Index = () => {
  const [login, isLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (login) {
      alert('you are loggin');
    } else {
      if (password === password2) {
        alert('registering done');
      } else {
        setError('Password Missmatch!');
      }
    }
  };
  return (
    <div>
      <section className="h-full gradient-form bg-gray-200 md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <Image className="mx-auto w-48" width="150" height="100" src={Logo} alt="logo" />
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">We are The Online Store Team</h4>
                      </div>
                      <form onSubmit={handleOnSubmit}>
                        <p className="mb-4 text-center text-red-600 font-bold">{login ? 'Please login to your account' : 'Register Here'}</p>
                        <div className="mb-4">
                          <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => {
                              setError('');
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => {
                              setError('');
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                        {!login && (
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Re Enter Your Password"
                              required
                              value={password2}
                              onChange={(e) => {
                                setError('');
                                setPassword2(e.target.value);
                              }}
                            />
                          </div>
                        )}
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="submit"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            {login ? 'Login' : 'Register'}
                          </button>
                          {login && (
                            <a className="text-gray-500" href="#!">
                              Forgot password?
                            </a>
                          )}
                          <p className="text-red-500">{error}</p>
                        </div>

                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">{login ? `Don't have an account?` : 'Do you have an account?'}</p>
                          <button
                            type="button"
                            className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={() => {
                              isLogin(!login);
                              setError('');
                              setEmail('');
                              setPassword('');
                              setPassword2('');
                            }}
                          >
                            {login ? 'Register' : 'Login'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-black"
                    style={{
                      backgroundImage: `url("https://images.unsplash.com/photo-1580820267682-426da823b514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80")`,
                      backgroundSize: '100%',
                    }}
                  >
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                      <p className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
