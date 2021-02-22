import { firebase } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return !result.empty;
}

export async function getUserById(id) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', id)
    .get();

  return {
    ...result.docs[0].data(),
    docId: result.docs[0].id
  };
}

export async function getUserFollowedPhotos(userId, followingUserIds) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', followingUserIds)
    .get();

  const userFollowedPhotos = result.docs.map(item => ({
    ...item.data(),
    docId: item.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async photo => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserById(photo.userId);
      const { username } = user;
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}
