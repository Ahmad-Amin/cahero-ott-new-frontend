import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  token: Cookies.get('token') || null, 
  isAuthenticated: !!Cookies.get('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;

      if (user && token) { // Ensure valid payload
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;

        Cookies.set('token', token, { expires: 7 }); // Persist token for 7 days
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      Cookies.remove('token'); // Remove token cookie
    },
    updateUser: (state, action) => {
      const { user, token } = action.payload;

      if (user) {
        state.user = user;
        state.isAuthenticated = true;

        if (token) {
          state.token = token;
          Cookies.set('token', token, { expires: 7 }); // Update token if provided
        }
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
