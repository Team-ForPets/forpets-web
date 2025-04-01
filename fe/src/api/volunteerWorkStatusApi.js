import api from './axios';

const ENDPOINT = '/volunteer-work-status';
const VolunteerWorkStatusApi = {
  getVolunteerWorkStatus: async (state) => {
    const response = await api.get(`${ENDPOINT}?status=${state}`);
    return response.data;
  },
  getMyVolunteerWorkStatus: async () => {
    const response = await api.get(`/my${ENDPOINT}`, { withCredentials: true });
    return response;
  },
};
export default VolunteerWorkStatusApi;