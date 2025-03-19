import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Mypage from '../pages/Mypage';
import Chat from '../pages/Chat';
import ServiceStatus from '../pages/ServiceStatus';
import RegisterAnimal from '../pages/RegisterAnimal';
import RegisterVolunteer from '../pages/RegisterVolunteer';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/service-status',
        element: <ServiceStatus />,
      },
      {
        path: '/register-animal',
        element: <RegisterAnimal />,
      },
      {
        path: '/register-volunteer',
        element: <RegisterVolunteer />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/notfound" replace />,
  },
]);

export default router;
