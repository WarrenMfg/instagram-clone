import React from 'react';
import { Link } from 'react-router-dom';
import avatars from '../../../images/avatars/*.jpg';

function Header({ username }) {
  return (
    <div className='flex border-b h-4 p-4 py-8'>
      <div className='flex items-center'>
        <Link to={`/p/${username}`} className='flex items-center'>
          <img
            className='rounded-full h-8 w-8 flex mr-3'
            src={avatars[username]}
            alt={`${username}'s profile picture`}
          />
          <p className='font-bold'>{username}</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
