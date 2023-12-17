// AuthForm.js

import React, { useState } from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import '../tailwind.css';

const AuthForm = ({ userType, onUserTypeChange }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLoginSignUp = () => {
    setIsLogin(!isLogin);
  };

  // Fields for registration form
  const registrationFields = (
    <div className='h-full pb-8 flex flex-col justify-center items-center'>
      <input
        type="email"
        placeholder="Email"
        className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="text"
        placeholder="User Name"
        className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="date"
        placeholder="Date of Birth"
        className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="text"
        placeholder="City"
        className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
      />
    </div>
  );

  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <div className="container h-screen mx-auto">
        <div className="g-6 flex flex-wrap items-center h-screen justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div className="flex items-center justify-center px-4 lg:w-6/12">
                  <div className="mx-16">
                    {/* Logo */}
                    <div className="text-center pt-8">
                      <div className="text-emerald font-bold text-3xl">TeamUp</div>
                      <h4 className="mb-8 text-xl font-semibold">
                        We Bring People Together and Venues Closer
                      </h4>
                    </div>

                    <form>
                      <p className="mb-4">
                        {isLogin ? 'Please login to your account' : 'Create a new account'}
                      </p>

                      {/* Conditionally render fields based on the mode */}
                      {isLogin ? (
                        <>
                          <input
                            type="text"
                            placeholder="Username"
                            className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
                          />
                        </>
                      ) : (
                        registrationFields
                      )}

                      {/* Submit button */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase bg-gray text-neutral transition duration-300 ease-in-out hover:bg-emerald hover:text-gray"
                          type="button"
                        >
                          {isLogin ? 'Log in' : 'Register'}
                        </button>

                        {/* Toggle between login and register modes */}
                        <div className="mt-2">
                          <span className="text-sm">
                            {isLogin
                              ? "Don't have an account?"
                              : 'Already have an account?'}
                          </span>
                          <button
                            type="button"
                            className="ml-2 text-orange hover:text-emerald"
                            onClick={toggleLoginSignUp}
                          >
                            {isLogin ? 'Register' : 'Login'}
                          </button>
                        </div>

                        {/* Forgot password link */}
                        {isLogin && (
                          <a href="#!" className='hover:text-orange'>
                            Forgot password?
                          </a>
                        )}
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex h-screen items-center lg:w-6/12 bg-gray text-neutral"
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
