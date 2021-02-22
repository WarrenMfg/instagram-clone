import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserById, getUserFollowedPhotos } from '../services/firebase';

export default function useFollowedUsersPhotos() {
  const [photos, setPhotos] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      try {
        const userData = await getUserById(user.uid);

        if (userData.following.length > 0) {
          const followedUserPhotos = await getUserFollowedPhotos(
            user.uid,
            userData.following
          );
          followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
          setPhotos(followedUserPhotos);
        }
      } catch (error) {
        console.log('getTimelinePhotos:', error.message);
      }
    }
    if (user.uid) {
      getTimelinePhotos();
    }
  }, [user.uid]);

  return photos;
}
