import api from './axios';

const ENDPOINT = '/service-volunteer';
const todoApi = {
  // example
  createVolunteer: async (formdata) => {
    const response = await api.post(`${ENDPOINT}`, formdata);
    return response.data;
  },
};

export default todoApi;
