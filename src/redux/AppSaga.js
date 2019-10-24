import { call, select, put } from 'redux-saga/effects';
import firebase from 'services/firebase';
import notifier from 'utils/notifier';
import logService from 'services/logs';
import userService from 'services/users';
import AppActions, { AppSelectors } from './AppRedux';

export function* logout() {
  yield call([firebase.auth(), 'signOut']);
}

export function* setCity(action) {
  const { city, silent } = action;
  if (silent) return;

  const user = yield select(AppSelectors.selectUser);

  try {
    yield call(logService.addLog, user.uid, city);
    yield call(userService.changeCity, user.uid, city);
  } catch (e) {
    notifier.error(e.message);
  }
}

export function* loadLogs() {
  const user = yield select(AppSelectors.selectUser);

  try {
    yield put(AppActions.setLogsLoading(true));
    const logs = yield call(logService.loadLogs, user.uid);
    yield put(AppActions.setLogs(logs));
    yield put(AppActions.setLogsLoading(false));
  } catch (e) {
    notifier.error(e.message);
  }
}

export function* changeUser(action) {
  const { user } = action;

  try {
    if (user) {
      const data = yield call(userService.loadUser, user.uid);
      yield put(
        AppActions.setUser({
          uid: user.uid,
          ...data
        })
      );
      yield put(AppActions.setCity(data.city, true));
    } else {
      yield put(AppActions.setUser(null));
    }
    yield put(AppActions.setLoaded(true));
  } catch (e) {
    notifier.error(e.message);
  }
}
