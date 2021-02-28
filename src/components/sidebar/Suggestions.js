import React, { memo, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './SuggestedProfile';
import { getSuggestedProfiles } from '../../services/firebase';

function Suggestions({ userId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId);
      setProfiles(response);
    }
    if (userId) {
      try {
        suggestedProfiles();
      } catch (error) {
        console.error(error);
      }
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} className='mt-5' />
  ) : (
    <div className='flex flex-col'>
      <div className='flex items-center align-items justify-between mb-2 mt-2'>
        <p className='font-bold text-sm'>Suggestions for you</p>
      </div>
      <div className='grid gap-5 mt-4'>
        {profiles.map(profile => (
          <SuggestedProfile
            key={profile.docId}
            suggestedDocId={profile.docId}
            suggestedUsername={profile.username}
            suggestedUserId={profile.userId}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(Suggestions);
