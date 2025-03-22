import { configureStore } from '@reduxjs/toolkit';
import authReduce from './slices/authSlice';
// import volunteerReducer from './slices/volunteerSlice';

const store = configureStore({
  reducer: {
    auth: authReduce,
    // volunteer: volunteerReducer,
  },
});

export default store;
