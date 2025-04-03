import api from './axios';

const ENDPOINT = '/my';
const mypageApi = {
  // 회원정보 조회
  getProfile: async () => {
    const response = await api.get(`${ENDPOINT}/profile`);
    return response.data;
  },
  getMyAnimals: async () => {
    const response = await api.get(`${ENDPOINT}/animals`);
    return response.data;
  },
  getMyVolunteerPost: async () => {
    const response = await api.get(`${ENDPOINT}/volunteer-posts`, { withCredentials: true });
    return response;
  },
};

export default mypageApi;
