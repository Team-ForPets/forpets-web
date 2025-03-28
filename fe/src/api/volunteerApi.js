import api from './axios';

const ENDPOINT = '/service-volunteer';
const volunteerApi = {
  
  createVolunteer: async (formdata) => {
    const response = await api.post(`${ENDPOINT}`, formdata);
    return response.data;
  },

// Get all service volunteers
getVolunteers: async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
},

// Get a specific service volunteer by ID
getVolunteerById: async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`);
  return response.data;
},

// Update a service volunteer
updateVolunteer: async (id, data) => {
  const response = await api.put(`${ENDPOINT}/${id}`, data);
  return response.data;
},

// Delete a service volunteer
deleteVolunteer: async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`);
  return response.data;
},
};

export default volunteerApi;
