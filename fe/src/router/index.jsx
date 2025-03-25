import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Mypage from '../pages/MyPage';
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
import ProfileEditCard from '../components/mypage/ProfileEditCard';
import RescueAnimals from '../pages/RescueAnimals';

// 로그아웃시 뒤로가기로 마이페이지, 나의채팅 페이지 이동 막는 컴포넌트
import PrivateRoute from '../components/PrivateRoute';

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
        path: '/rescue-animals',
        element: <RescueAnimals />,
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

        element: (
          <PrivateRoute>
            <Mypage />
          </PrivateRoute>
        ),
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
            path: '/my/profile/edit',
            element: <ProfileEditCard />,
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
        element: (
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        ),
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
