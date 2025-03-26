import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../store/slices/authSlice';

function SocialLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보 가져오기

  useEffect(() => {
    const params = new URLSearchParams(location.search); // ✅ 쿼리 파라미터 읽기

    const accessToken = params.get('accessToken');
    const username = params.get('username');

    if (accessToken && username) {
      console.log('✅ 소셜 로그인 성공! Redux 저장 중...');

      // Redux 저장 (authSlice.js에서 localStorage도 자동 저장됨)

      dispatch(login({ accessToken, username }));

      // ✅ 메인 페이지 이동
      navigate('/');
    } else {
      console.error('❌ 소셜 로그인 실패: 토큰이 없음');
      navigate('/login');
    }
  }, [dispatch, navigate, location]);
  return <div>소셜 로그인 중...</div>;
}

export default SocialLogin;
