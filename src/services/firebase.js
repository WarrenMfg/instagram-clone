import { firebase, FieldValue } from '../lib/firebase';

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

export async function getSuggestedProfiles(userId) {
  const { following } = await getUserById(userId);
  const users = await firebase.firestore().collection('users').limit(10).get();

  return users.docs
    .map(user => ({ ...user.data(), docId: user.id }))
    .filter(
      profile =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}

export async function followUser(
  userToFollowId,
  userId,
  suggestedDocId,
  isAlreadyFollowing
) {
  const { docId } = await getUserById(userId);
  await updateFollowing(docId, userToFollowId, isAlreadyFollowing);
  await updateFollowers(suggestedDocId, userId);
}

async function updateFollowing(docId, userToFollowId, isAlreadyFollowing) {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      following: isAlreadyFollowing
        ? FieldValue.arrayRemove(userToFollowId)
        : FieldValue.arrayUnion(userToFollowId)
    });
}

async function updateFollowers(docId, followerId, isAlreadyFollowing) {
  return firebase
    .firestore()
    .collection('users')
    .doc(docId)
    .update({
      followers: isAlreadyFollowing
        ? FieldValue.arrayRemove(followerId)
        : FieldValue.arrayUnion(followerId)
    });
}
