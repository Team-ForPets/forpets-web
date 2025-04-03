import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Mypage from '../pages/MyPage';
import Chat from '../pages/Chat';
import VolunteerWorkStatus from '../pages/VolunteerWorkStatus';
import RegisterAnimal from '../pages/RegisterAnimal';
import RegisterVolunteer from '../pages/RegisterVolunteer';
import ProfileCard from '../components/mypage/ProfileCard';
import AnimalCard from '../components/mypage/AnimalCard';
import VolunteerCardList from '../components/mypage/VolunteerCardList';
import AnimalList from '../pages/AnimalList';
import AnimalDetail from '../pages/AnimalDetail';
import VolunteerList from '../pages/VolunteerList';
import VolunteerDetail from '../pages/VolunteerDetail';
import ProfileEditCard from '../components/mypage/ProfileEditCard';
import RescueAnimalList from '../pages/RescueAnimalList';
import SocialLogin from '../pages/SocialLogin';
// 로그아웃시 뒤로가기로 마이페이지, 나의채팅 페이지 이동 막는 컴포넌트
import PrivateRoute from '../components/PrivateRoute';
import RescueAnimalDetail from '../pages/RescueAnimalDetail';

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
        path: '/rescue-animal-list',
        element: <RescueAnimalList />,
      },
      {
        path: '/rescue-animal-detail',
        element: <RescueAnimalDetail />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/social-login',
        element: <SocialLogin />,
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
            element: <VolunteerCardList />,
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
        path: '/volunteer-work-status',
        element: <VolunteerWorkStatus />,
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
        path: '/volunteer-detail/:id',
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
