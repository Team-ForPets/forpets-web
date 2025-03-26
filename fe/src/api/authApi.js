import api from './axios';

const ENDPOINT = '/auth';
const authApi = {
  // 회원가입
  signup: async (formData) => {
    const response = await api.post(`${ENDPOINT}/signup`, formData);
    return response.data;
  },

  // username 유효성 검사
  checkUsername: async (username) => {
    const response = await api.get(`${ENDPOINT}/email-verifications?username=${username}`);
    return response.data;
  },
  // nickname 유효성 검사
  checkNickname: async (nickname) => {
    const response = await api.get(`${ENDPOINT}/nickname-verifications?nickname=${nickname}`);
    return response.data;
  },
  // username 인증 코드 전송
  sendAuthCode: async (username) => {
    const response = await api.post(`${ENDPOINT}/send-auth-code`, { username });
    return response.data;
  },

  // username 인증 코드 검증
  verifyCode: async (username, code) => {
    const response = await api.post(`${ENDPOINT}/verify-code`, { username, code });
    return response.data;
  },

  // 로그인
  login: async (formData) => {
    const response = await api.post(`${ENDPOINT}/login`, formData, { withCredentials: true });
    console.log(response);
    return response.data;
  },

  // 로그아웃
  logout: async () => {
    const response = await api.post(`${ENDPOINT}/logout`, {}, { withCredentials: true });
    return response;
  },

  // 인증
  verify: async () => {
    const response = await api.get(`${ENDPOINT}/verify`);
    return response;
  },

  // 토큰 갱신 요청
  reissue: async () => {
    const response = await api.post(`${ENDPOINT}/reissue`, {
      withCredentials: true,
    });
    return response;
  },
};

export default authApi;
