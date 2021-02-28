import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatars from '../../../images/avatars/*.jpg';
import { followUser } from '../../services/firebase';

function SuggestedProfile({
  suggestedDocId,
  suggestedUsername,
  suggestedUserId,
  userId
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    try {
      await followUser(suggestedUserId, userId, suggestedDocId, false);
      setFollowed(true);
    } catch (error) {
      console.error(error);
    }
  }

  return !followed ? (
    <div className='flex flex-row items-center align-items justify-between'>
      <div className='flex items-center justify-between'>
        <img
          className='rounded-full w-8 flex mr-3'
          src={avatars[suggestedUsername]}
          alt={`Follow ${suggestedUsername}`}
        />
        <Link to={`/p/${suggestedUsername}`}>
          <p className='font-bold text-sm'>{suggestedUsername}</p>
        </Link>
      </div>
      <div className='flex'>
        <button
          className='text-sm font-bold text-blue'
          type='button'
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

export default SuggestedProfile;
