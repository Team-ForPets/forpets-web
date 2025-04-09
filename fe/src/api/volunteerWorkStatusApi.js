import api from './axios';

const ENDPOINT = '/volunteer-work-status';
const VolunteerWorkStatusApi = {
  // 이동봉사 현황 추가(약속잡기)
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
  // 나의 이동봉사현황 삭제(약속 취소)
  deleteVolunteerWorkStatus: async (volunteerStatusId) => {
    const response = await api.delete(`${ENDPOINT}/${volunteerStatusId}`);
    return response;
  },
  // 나의 이동봉사현황 수정(이동 완료)
  completeVolunteerWorkStatus: async (volunteerStatusId) => {
    const response = await api.patch(`${ENDPOINT}/${volunteerStatusId}`);
    return response;
  },
};
export default VolunteerWorkStatusApi;
