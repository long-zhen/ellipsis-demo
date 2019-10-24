import firebase from 'services/firebase';

function changeCity(uid, city) {
  const user = firebase
    .firestore()
    .collection('users')
    .doc(uid);

  return user.update({
    city
  });
}

function loadUser(uid) {
  const user = firebase
    .firestore()
    .collection('users')
    .doc(uid);

  return user.get().then(doc => {
    return {
      uid,
      ...doc.data()
    };
  });
}

export default {
  changeCity,
  loadUser
};
