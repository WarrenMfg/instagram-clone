import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import UserProfile from '../components/profile';
import { getUserByUsername } from '../services/firebase';
import { NOTFOUND } from '../constants/routes';

function Profile() {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => (document.title = `${username} - Instagram`), [username]);
  useEffect(() => {
    async function checkUserExistsToLoadProfile() {
      const doesUserExist = await getUserByUsername(username);
      if (!doesUserExist) {
        history.push(NOTFOUND);
      } else {
        setUserExists(true);
      }
    }

    checkUserExistsToLoadProfile();
  }, [username, history]);

  return userExists ? (
    <div className='bg-gray'>
      <Header />
      <div className='mx-auto max-w-screen-lg'>
        <UserProfile username={username} />
      </div>
    </div>
  ) : null;
}

export default Profile;
