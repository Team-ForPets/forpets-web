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
  updateAnimal: async (myAnimalId, formData) => {
    const response = await api.put(`/my${ENDPOINT}/${myAnimalId}`, formData);
    return response.data;
  },

  // 나의 아이 삭제
  deleteAnimal: async (myAnimalId) => {
    const response = await api.delete(`/my${ENDPOINT}/${myAnimalId}`);
    return response;
  },
};

export default animalsApi;
