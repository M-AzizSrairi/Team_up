// AuthFormLeft.jsx
import React, { useState } from 'react';

const AuthFormLeft = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('player')

  const toggleLoginSignUp = () => {
    setIsLogin(!isLogin);
  };

  // Fields for registration form
  const registrationFields = (
    <div className='h-full pb-8 flex flex-col justify-center items-center'>
      <input
        type="email"
        placeholder="Email"
        className="p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="text"
        placeholder="User Name"
        className="p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="date"
        placeholder="Date of Birth"
        className="p-3 bg-neutral text-gray w-full mb-3"
      />
      <input
        type="text"
        placeholder="City"
        className="p-3 bg-neutral text-gray w-full mb-3"
      />
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        className="mt-1 p-3 bg-neutral text-gray w-full"
      >
        <option value="player">Player</option>
        <option value="owner">Owner</option>
      </select>
    </div>
  );

  return (
    <div className="flex items-center justify-center px-4 lg:w-6/12">
      <div className="mx-16">
        <div className="text-center pt-8">
          <div className="text-emerald font-bold text-3xl">Team Up</div>
          <h4 className="mb-8 text-xl font-semibold">
            We Bring People Together and Venues Closer
          </h4>
        </div>

        <form>
          <p className="mb-4">
            {isLogin ? 'Please login to your account' : 'Create a new account'}
          </p>

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
              <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 p-3 bg-neutral text-gray w-full mb-3"
            >
              <option value="player">Player</option>
              <option value="owner">Owner</option>
            </select>
            </>
          ) : (
            registrationFields
          )}

          <div className="mb-8 pb-1 pt-1 text-center">
            <button
              className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase bg-gray text-neutral transition duration-300 ease-in-out hover:bg-emerald hover:text-gray"
              type="button"
            >
              {isLogin ? 'Log in' : 'Register'}
            </button>

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

            {isLogin && (
              <a href="#!" className='hover:text-orange'>
                Forgot password?
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthFormLeft;