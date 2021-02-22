import React from 'react';
import useUser from '../hooks/useUser';

function Sidebar() {
  const { docId, userId, following, username, fullName } = useUser();

  return (
    <div className='p-4'>
      <p>I am the sidebar</p>
    </div>
  );
}

export default Sidebar;
