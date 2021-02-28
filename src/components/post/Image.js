import React from 'react';
import raphael from '../../../images/users/raphael/*.jpg';

function Image({ src, caption }) {
  const file = src.split('/').pop().split('.')[0];
  return (
    <div className='post__img'>
      <img src={raphael[file]} alt={caption} />
    </div>
  );
}

export default Image;
