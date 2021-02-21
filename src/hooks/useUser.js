import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserById } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUser() {
      const response = await getUserById(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUser();
    }
  }, [user]);

  return activeUser;
}
