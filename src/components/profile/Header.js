import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/useUser';
import avatars from '../../../images/avatars/*.jpg';
import { toggleFollow } from '../../services/firebase';

function Header({
  photosCount,
  profile,
  followerCount,
  setFollowerCount,
  username
}) {
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const [user, setUser] = useUser();

  useEffect(() => {
    if (user.following && profile.userId) {
      setIsFollowingProfile(user.following.includes(profile.userId));
    }
  }, [user.following, profile]);

  const activeBtnFollow = user?.username !== username;

  const handleToggleFollow = async () => {
    setIsFollowingProfile(isFollowingProfile => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    const updatedUser = await toggleFollow(user, profile, isFollowingProfile);
    setUser(updatedUser);
  };

  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
      <div className='container flex justify-center'>
        <img
          className='rounded-full h-40 w-40 flex'
          alt={`${avatars[username]}'s profile picture`}
          src={avatars[username]}
        />
      </div>
      <div className='flex items-center justify-center flex-col col-span-2'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{username}</p>
          {activeBtnFollow && (
            <button
              className={`bg-blue-500 font-bold text-sm rounded text-white w-20 h-8 ${
                !Object.keys(user).length && 'opacity-50 cursor-not-allowed'
              }`}
              type='button'
              onClick={handleToggleFollow}
              disabled={!Object.keys(user).length}
            >
              {isFollowingProfile === null
                ? 'Follow'
                : isFollowingProfile
                ? 'Unfollow'
                : 'Follow'}
            </button>
          )}
        </div>

        <div className='container flex mt-4'>
          {!profile.following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span>{' '}
                {photosCount === 1 ? 'photo' : 'photos'}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followerCount}</span>{' '}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{profile.following.length}</span>{' '}
                following
              </p>
            </>
          )}
        </div>

        <div className='container mt-4'>
          <p className='font-medium'>
            {!profile.fullName ? (
              <Skeleton count={1} height={24} />
            ) : (
              profile.fullName
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
