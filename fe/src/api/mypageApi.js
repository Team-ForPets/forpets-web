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
  // 닉네임 중복 확인 검증
  getNicknameVerification: async (nickname) => {
    const response = await api.get(`/auth/nickname-verifications?nickname=${nickname}`);
    return response.data;
  },
  // 프로필(회원정보) 수정
  updateUserInfo: async (formData) => {
    const response = await api.patch(`${ENDPOINT}/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default mypageApi;
