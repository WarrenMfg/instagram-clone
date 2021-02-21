import React from 'react';
import useUser from '../hooks/useUser';

function Sidebar() {
  const user = useUser();

  return <div>{user.username}</div>;
}

export default Sidebar;
