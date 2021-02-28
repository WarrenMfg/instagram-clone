import React from 'react';
import Skeleton from 'react-loading-skeleton';
import raphael from '../../../images/users/raphael/*.jpg';

function Photos({ user, photos }) {
  const photoFiles = photos?.map(photo => photo.photoId) || [];

  return (
    <div className='h-16 border-t border-gray mt-12 pt-4'>
      <div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
        {!photos ? (
          <>
            {[...new Array(9)].map((_, index) => (
              <Skeleton key={index} count={1} width={320} height={400} />
            ))}
          </>
        ) : photos.length > 0 ? (
          photos.map((photo, i) => (
            <div key={photo.docId} className='relative group'>
              <img src={raphael[photoFiles[i]] || ''} alt={photo.caption} />
            </div>
          ))
        ) : null}
      </div>

      {(!photos || photos.length === 0) && (
        <p className='text-center text-2xl'>No Photos Yet</p>
      )}
    </div>
  );
}

export default Photos;
