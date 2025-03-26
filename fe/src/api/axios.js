import axios from 'axios';
import store from '../store/store';
// import { logout, updateTokens } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
// 모든 api를 사용한다. backend와 연결

// const coordApi = axios.create({
//   baseURL: 'https://dapi.kakao.com/v2/local', // Kakao Local API의 기본 URL
// });

// // 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// // coordApi에 Kakao API 키를 요청 헤더에 추가
// coordApi.interceptors.request.use(
//   (config) => {
//     config.headers['Authorization'] = `KakaoAK ${import.meta.env.VITE_REST_API_KEY}`; // Kakao API 키 추가
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default api;
