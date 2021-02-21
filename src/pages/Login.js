import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SIGNUP, DASHBOARD } from '../constants/routes';
import FirebaseContext from '../context/firebase';

import iPhone from '../../images/iphone-with-profile.jpg';
import logo from '../../images/logo.png';

function Login() {
  // update title
  useEffect(() => (document.title = 'Login - Instagram'), []);

  // get context
  const { firebase } = useContext(FirebaseContext);
  // history for routing
  const history = useHistory();

  // handle login
  const handleLogin = async e => {
    e.preventDefault();
    try {
      // login
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // route user
      history.push(DASHBOARD);
    } catch (error) {
      // reset and set error
      setEmail('');
      setPassword('');
      setError(error.message);
    }
  };

  // email state
  const [email, setEmail] = useState('');
  // password state
  const [password, setPassword] = useState('');
  // error state
  const [error, setError] = useState('');
  // invalidate button
  const isInvalid = !email || !password;

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img src={iPhone} alt='iPhone with Instagram app' />
      </div>
      <div className='flex flex-col w-2/5'>
        <h1 className='flex justify-center w-full'>
          <img src={logo} alt='Instagram' className='mt-2 w-6/12 mb-4' />
        </h1>

        {error && <p className='mb-4 p-2 text-xs text-red-500'>{error}</p>}

        <form method='POST' className='mb-2' onSubmit={handleLogin}>
          <input
            aria-label='Enter your email address'
            className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2'
            type='text'
            placeholder='Email address'
            name='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            aria-label='Enter your password'
            className='text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button
            disabled={isInvalid}
            type='submit'
            className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
              isInvalid && 'cursor-not-allowed opacity-50'
            }`}
          >
            Log In
          </button>
        </form>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <Link to={SIGNUP} className='font-bold text-blue-500'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
