import api from "./axios";

const ENDPOINT = '/chat';
const todoApi = {
  // example
  getTodos: async (bucketId) => {
    const response = await api.get(`${ENDPOINT}/${bucketId}/todos`);
    return response.data;
  },
}

export default todoApi;