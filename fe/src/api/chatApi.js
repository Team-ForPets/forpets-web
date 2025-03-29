import api from './axios';

const ENDPOINT = '/chat/rooms';
const todoApi = {
  // 채팅방 생성
  createChatRoom: async (formData) => {
    const response = await api.post(`${ENDPOINT}`, formData);
    return response.data;
  },
  // 내가 요청자로 속한 채팅방 전체 조회 API
  getMyRequestRooms: async (requestorId) => {
    const response = await api.get(`${ENDPOINT}/requestor?requestorId=${requestorId}`);
    return response.data;
  },
  // 내가 봉사자로 속한 채팅방 전체 조회
  getMyVolunteerRooms: async (volunteerId) => {
    const response = await api.get(`${ENDPOINT}/volunteer?volunteerId=${volunteerId}`);
    return response.data;
  },
  // 채팅방 상세 정보 조회 (메세지 조회)
  getChatRoomDetail: async (chatRoomId) => {
    const response = await api.get(`${ENDPOINT}/${chatRoomId}`);
    return response.data;
  },
};

export default todoApi;
