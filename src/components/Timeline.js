import React from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUsersPhotos from '../hooks/useFollowedUsersPhotos';
import Post from './post';

function Timeline() {
  const photos = useFollowedUsersPhotos();
  return (
    <div className='container col-span-2'>
      {!photos ? (
        <Skeleton count={4} height={500} className='mb-5' />
      ) : (
        photos.map(content => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}

export default Timeline;
