import React from 'react';
import Skeleton from 'react-loading-skeleton';

function Timeline() {
  const photos = null;
  return (
    <div className='container col-span-2'>
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton key={index} count={1} height={400} />
          ))}
        </>
      ) : photos && photos.length > 0 ? (
        photos.map(content => <p>I will be a photo</p>)
      ) : (
        <p className='text-center text-2xl'>Follow people to see photos!</p>
      )}
    </div>
  );
}

export default Timeline;
