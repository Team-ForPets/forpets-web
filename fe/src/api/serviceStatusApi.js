import api from './axios';

const ENDPOINT = '/service-status';
const serviceStatusApi = {
  getServiceStatus: async (state) => {
    const response = await api.get(`${ENDPOINT}/service-status?state=${state}`);
    return response.data;
  },
  getMyServiceStatus: async () => {
    const response = await api.post(`/my${ENDPOINT}/service-status`, {}, { withCredentials: true });
    return response;
  }

}
export default serviceStatusApi;