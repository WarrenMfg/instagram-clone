import React from 'react';
import useUser from '../hooks/useUser';

function Sidebar() {
  const { docId, userId, following, username, fullName } = useUser();

  return <div>{username}</div>;
}

export default Sidebar;
