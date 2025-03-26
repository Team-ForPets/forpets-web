import axios from 'axios';
import store from '../store/store';
import authApi from './authApi';
import { logout, updateTokens } from '../store/slices/authSlice';
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

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response, // 응답이 성공적일 경우 그대로 반환
  async (error) => {
    const originalRequest = error.config; // 실패한 요청 정보

    if (error.response.status === 401) {
      // 401: 토큰 만료
      try {
        // 1. 토큰 재발급 요청
        const response = await authApi.reissue();

        const accessToken = response.data.data.accessToken;

        // 2. 토큰 갱신
        store.dispatch(updateTokens({ accessToken }));
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // 원래 요청에도 반영

        // 3. 갱신된 토큰으로 원래 요청 재시도
        return axios(originalRequest);
      } catch (refreshError) {
        // 4. 재발급 실패 시 로그아웃
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    // 5. 다른 에러는 그대로 반환
    return Promise.reject(error);
  },
);

export default api;
