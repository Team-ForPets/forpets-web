import api from "./axios";

const ENDPOINT = '/my';
const bucketApi = {
  // example
  getTodos: async (bucketId) => {
    const response = await api.get(`${ENDPOINT}/${bucketId}/todos`);
    return response.data;
  },
};

export default bucketApi;