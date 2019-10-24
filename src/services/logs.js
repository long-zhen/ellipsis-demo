import firebase from 'services/firebase';

function addLog(uid, city) {
  const log = firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('logs')
    .doc();

  return log.set({
    timestamp: new Date().valueOf(),
    city
  });
}

function loadLogs(uid) {
  const logs = firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .collection('logs')
    .orderBy('timestamp', 'desc')
    .limit(100);

  return logs.get().then(snaps => {
    return snaps.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });
}

export default {
  addLog,
  loadLogs
};
