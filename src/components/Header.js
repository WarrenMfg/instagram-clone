import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD } from '../constants/routes';
import FirebaseContext from '../context/firebase';

import logo from '../../images/logo.png';

function Header() {
  // get context
  const { firebase } = useContext(FirebaseContext);

  return (
    <header className='h-16 bg-white border-b mb-8'>
      <div className='container mx-auto max-width-lg h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
            <h1>
              <Link to={DASHBOARD} aria-label='Dashboard'>
                <img
                  src={logo}
                  alt='Instagram'
                  className='mt-2 w-1/2 mx-auto'
                />
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
