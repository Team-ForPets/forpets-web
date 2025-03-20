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
import ProfileCard from '../components/mypage/ProfileCard';
import AnimalCard from '../components/mypage/AnimalCard';
import VolunteerCard from '../components/mypage/VolunteerCard';
import AnimalList from '../pages/AnimalList';
import AnimalDetail from '../pages/AnimalDetail';
import VolunteerList from '../pages/VolunteerList';
import VolunteerDetail from '../pages/VolunteerDetail';

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
        path: '/my',
        element: <Mypage />,
        children: [
          {
            // path: '/my/profile',
            index: true,
            element: <ProfileCard />,
          },
          {
            path: '/my/profile',
            element: <ProfileCard />,
          },
          {
            path: '/my/animals',
            element: <AnimalCard />,
          },
          {
            path: '/my/volunteer-posts',
            element: <VolunteerCard />,
          },
        ],
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
      {
        path: '/animal-list',
        element: <AnimalList></AnimalList>,
      },
      {
        path: '/animal-detail',
        element: <AnimalDetail></AnimalDetail>,
      },
      {
        path: '/volunteer-list',
        element: <VolunteerList></VolunteerList>,
      },
      {
        path: '/volunteer-detail',
        element: <VolunteerDetail></VolunteerDetail>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/notfound" replace />,
  },
]);

export default router;
