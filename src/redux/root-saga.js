import { all, takeLatest } from 'redux-saga/effects';
import { AppTypes } from './AppRedux';
import { logout, changeUser, setCity, loadLogs } from './AppSaga';

export default function* root() {
  yield all([takeLatest(AppTypes.LOGOUT, logout)]);
  yield all([takeLatest(AppTypes.SET_CITY, setCity)]);
  yield all([takeLatest(AppTypes.LOAD_LOGS, loadLogs)]);
  yield all([takeLatest(AppTypes.CHANGE_USER, changeUser)]);
}
