import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD, LOGIN, SIGNUP } from '../constants/routes';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

import logo from '../../images/logo.png';
import avatars from '../../images/avatars/*.jpg';

function Header() {
  // get context
  const { firebase } = useContext(FirebaseContext);
  // get user
  const { user } = useContext(UserContext);

  return (
    <header className='h-16 bg-white border-b mb-8'>
      <div className='container mx-auto max-width-lg h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
            <h1>
              <Link to={DASHBOARD} aria-label='Dashboard'>
                <img src={logo} alt='Instagram' className='mt-2 w-6/12' />
              </Link>
            </h1>
          </div>
          <div className='text-gray text-center flex items-center align-items'>
            {user ? (
              <>
                <Link to={DASHBOARD} arial-label='Dashboard'>
                  <svg
                    className='w-8 mr-6 text-black-light cursor-pointer'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                </Link>

                <button
                  type='button'
                  title='Sign Out'
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-8 mr-6 text-black-light cursor-pointer'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                    />
                  </svg>
                </button>
                <div className='flex items-center cursor-pointer'>
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className='rounded-full h-8 w-8 flex'
                      src={avatars[user.displayName]}
                      alt={`${user.displayName}'s profile picture`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={LOGIN}>
                  <button
                    type='button'
                    className='bg-blue-500 font-bold text-sm rounded text-white w-20 h-8'
                  >
                    Log In
                  </button>
                </Link>
                <Link to={SIGNUP}>
                  <button
                    type='button'
                    className='font-bold text-sm rounded text-blue w-20 h-8'
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
