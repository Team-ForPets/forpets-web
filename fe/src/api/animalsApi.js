import api from './axios';

const ENDPOINT = '/animals';
const animalsApi = {
  // 나의 아이 전체 조회
  getAnimals: async () => {
    const response = await api.get(`${ENDPOINT}`);
    return response.data;
  },

  // 나의 아이 생성
  createAnimal: async (formData) => {
    const response = await api.post(`${ENDPOINT}`, formData);
    return response.data;
  },

  // 나의 아이 수정
  updateAnimal: async (bucketId, AnimalId, formData) => {
    const response = await api.patch(`${ENDPOINT}/${bucketId}/Animals/${AnimalId}`, formData);
    return response.data;
  },

  // 나의 아이 삭제
  deleteAnimal: async (bucketId, AnimalId) => {
    const response = await api.delete(`${ENDPOINT}/${bucketId}/todos/${todoId}`);
    return response;
  },
};

export default animalsApi;
