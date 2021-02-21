import React, { useEffect } from 'react';

function NotFound() {
  // update title
  useEffect(() => (document.title = 'Not Found - Instagram'), []);

  return (
    <div className='bg-gray-200 h-screen flex items-center justify-center'>
      <h1 className='text-2xl'>Not found! 😭</h1>
    </div>
  );
}

export default NotFound;
