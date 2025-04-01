import api from './axios';

const ENDPOINT = '/volunteer-work-status';
const VolunteerWorkStatusApi = {
  createVolunteerWorkStatus: async (data) => {
    const response = await api.post(`${ENDPOINT}`, data);
    return response.data;
  },
  // 이동봉사 현황 전체 조회
  getVolunteerWorkStatus: async (state) => {
    const response = await api.get(`${ENDPOINT}?status=${state}`);
    return response.data;
  },
  // 나의 이동봉사현황 전체 조회
  getMyVolunteerWorkStatus: async () => {
    const response = await api.get(`/my${ENDPOINT}`, { withCredentials: true });
    return response;
  },
};
export default VolunteerWorkStatusApi;
