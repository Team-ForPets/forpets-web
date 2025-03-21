import api from './axios';

const ENDPOINT = '/my';
const mypageApi = {
  // 회원정보 조회
  getProfile: async () => {
    const response = await api.get(`${ENDPOINT}/profile`);
    return response.data;
  },
};

export default mypageApi;
