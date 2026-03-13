import { createSlice } from '@reduxjs/toolkit';
import { clearSession, readSession, writeSession, GUEST_ROADMAP_STORAGE_KEY } from '../../utils/session';

const session = readSession();
const hasToken = Boolean(localStorage.getItem('token'));
const isGuestSession = session?.mode === 'guest';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: hasToken || isGuestSession,
  user: isGuestSession ? { username: 'Guest', isGuest: true } : null,
  mode: isGuestSession ? 'guest' : hasToken ? 'user' : 'anonymous',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.mode = 'user';
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      clearSession();
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.mode = state.token ? 'user' : state.mode;
      state.loading = false;
      state.error = null;
    },
    continueAsGuest: (state) => {
      state.token = null;
      state.isAuthenticated = true;
      state.user = { username: 'Guest', isGuest: true };
      state.mode = 'guest';
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      writeSession({ mode: 'guest', started_at: new Date().toISOString() });
    },
    exitGuestMode: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.mode = 'anonymous';
      state.loading = false;
      state.error = null;
      clearSession();
      localStorage.removeItem(GUEST_ROADMAP_STORAGE_KEY);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.mode = 'anonymous';
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
      clearSession();
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, setUser, continueAsGuest, exitGuestMode, logout } = authSlice.actions;
export default authSlice.reducer;
