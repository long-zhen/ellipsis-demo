import { createReducer, createActions } from 'reduxsauce';

/* --------------------- Types and Action Creators ---------------- */
const { Types, Creators } = createActions({
  setLoaded: ['loaded'],
  changeUser: ['user'],
  setUser: ['user'],
  setCity: ['city', 'silent'],
  setLogs: ['logs'],
  loadLogs: null,
  setLogsLoading: ['logsLoading'],
  logout: null
});

export const AppTypes = Types;

export default Creators;

/* --------------------- Selectors ---------------- */
export const AppSelectors = {
  selectLoaded: state => state.app.loaded,
  selectUser: state => state.app.user,
  selectCity: state => state.app.city,
  selectLogs: state => state.app.logs,
  selectLogsLoading: state => state.app.logsLoading
};

/* --------------------- Initial State ----------------- */
export const INITIAL_STATE = {
  city: '',
  logs: [],
  logsLoading: false,
  loaded: false,
  user: null
};

/* ------------------- Reducers --------------------- */
export const setLoaded = (state, { loaded }) => ({
  ...state,
  loaded
});

export const setUser = (state, { user }) => ({
  ...state,
  user
});

export const setCity = (state, { city }) => ({
  ...state,
  city
});

export const setLogs = (state, { logs }) => ({
  ...state,
  logs
});

export const setLogsLoading = (state, { logsLoading }) => ({
  ...state,
  logsLoading
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOADED]: setLoaded,
  [Types.SET_USER]: setUser,
  [Types.SET_CITY]: setCity,
  [Types.SET_LOGS]: setLogs,
  [Types.SET_LOGS_LOADING]: setLogsLoading
});
