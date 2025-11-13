import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuth';

export const Home = () => {
  const { userMode } = useAuthStore();
  
  // 모드에 따라 적절한 홈으로 리다이렉트
  return <Navigate to={userMode === 'employer' ? '/employer/home' : '/jobseeker/home'} replace />;
};

