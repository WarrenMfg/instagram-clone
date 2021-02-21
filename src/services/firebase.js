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
