import React, { useReducer, useEffect } from 'react';
import {
  getUserByUsername,
  getUserPhotosByUserId
} from '../../services/firebase';
import Header from './Header';
import Photos from './Photos';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0
};

export default function Profile({ username }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const user = await getUserByUsername(username);
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length
      });
    }

    getProfileInfoAndPhotos();
  }, [username]);

  return (
    <>
      <Header
        photosCollection={photosCollection.length}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}
