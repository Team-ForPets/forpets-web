import { createSlice } from '@reduxjs/toolkit';

// jwt 토큰에서 유저정보 추출
// import { jwtDecode } from 'jwt-decode';

// const accessToken = localStorage.getItem('accessToken');
// let userId = null;

// // JWT에서 userId 추출
// if (accessToken) {
//   const decoded = jwtDecode(accessToken);
//   userId = decoded.userId;
//   console.log('Decoded JWT:', decoded);
//   console.log('User ID:', userId);
// }

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoggedIn: !!localStorage.getItem('accessToken'),
  user: {
    id: localStorage.getItem('userId'),
    name: localStorage.getItem('userName'),
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user.id = action.payload.userId;
      state.user.name = action.payload.username;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('userName', action.payload.username);
    },

    logout: (state, action) => {
      state.accessToken = null;
      state.isLoggedIn = false;
      state.user.id = null;
      state.user.name = null;

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    },
    updateTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
  },
});

export const { login, logout, updateTokens } = authSlice.actions;
export default authSlice.reducer;
