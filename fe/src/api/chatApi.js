import api from './axios';

const ENDPOINT = '/chat/rooms';
const todoApi = {
  // 채팅방 생성
  createChatRoom: async (formData) => {
    const response = await api.post(`${ENDPOINT}`, formData);
    return response.data;
  },
  getMyRequestRooms: async (requestorId) => {
    const response = await api.get(`${ENDPOINT}/requestor?requestorId=${requestorId}`);
    return response.data;
  },
  getMyVolunteerRooms: async (volunteerId) => {
    const response = await api.get(`${ENDPOINT}/volunteer?volunteerId=${volunteerId}`);
    return response.data;
  },
  getChatRoomDetail: async (chatRoomId) => {
    const response = await api.get(`${ENDPOINT}/${chatRoomId}`);
    return response.data;
  },
};

export default todoApi;
