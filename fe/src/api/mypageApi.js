import api from './axios';

const ENDPOINT = '/my';
const mypageApi = {
  // 회원정보 조회
  getProfile: async () => {
    const response = await api.get(`${ENDPOINT}/profile`);
    return response.data;
  },
  // 사용자별 나의 아이 정보 조회
  getMyAnimals: async () => {
    const response = await api.get(`${ENDPOINT}/animals`);
    return response.data;
  },
  // 프로필 수정 시 비밀번호 검증
  getCheckPassword: async (data) => {
    const response = await api.post(`${ENDPOINT}/profile/password-verifications`, data);
    return response.data;
  },
};

export default mypageApi;
