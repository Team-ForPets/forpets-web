import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/user/Login';
import Signup from '../pages/user/Signup';
import Mypage from '../pages/user/MyPage';
import Chat from '../pages/chat/Chat';
import NotFound from '../pages/NotFound';
import VolunteerWorkStatus from '../pages/volunteerworkstatus/VolunteerWorkStatus';
import RegisterAnimal from '../pages/register/RegisterAnimal';
import RegisterVolunteer from '../pages/register/RegisterVolunteer';
import ProfileCard from '../components/mypage/ProfileCard';
import AnimalCardList from '../components/mypage/AnimalCardList';
import VolunteerCardList from '../components/mypage/VolunteerCardList';
import AnimalList from '../pages/animal/AnimalList';
import AnimalDetail from '../pages/animal/AnimalDetail';
import VolunteerList from '../pages/volunteer/VolunteerList';
import VolunteerDetail from '../pages/volunteer/VolunteerDetail';
import ProfileEditCard from '../components/mypage/ProfileEditCard';
import RescueAnimalList from '../pages/rescueanimal/RescueAnimalList';
import SocialLogin from '../pages/user/SocialLogin';
// 로그아웃시 뒤로가기로 마이페이지, 나의채팅 페이지 이동 막는 컴포넌트
import PrivateRoute from '../components/PrivateRoute';
import RescueAnimalDetail from '../pages/rescueanimal/RescueAnimalDetail';

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
            element: <AnimalCardList />,
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
    element: <NotFound />,
  },
]);

export default router;
