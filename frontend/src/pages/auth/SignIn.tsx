import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/useAuth';
import { authAPI } from '@/api/endpoints';
import { CTAButton } from '@/components/BottomCTA';

export const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authAPI.signin(email, password);
      setAuth(res.data.user, res.data.token);
      navigate('/jobseeker/home');
    } catch (error) {
      toast.error('로그인에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-[28px] font-bold text-primary-mint text-center mb-8">WorkFair</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email')}
            className="w-full h-12 px-4 border border-border rounded-input text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-mint/20"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password')}
            className="w-full h-12 px-4 border border-border rounded-input text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-mint/20"
            required
          />
          <CTAButton type="submit" variant="primary" fullWidth disabled={loading}>
            {t('auth.signin')}
          </CTAButton>
        </form>
      </div>
    </div>
  );
};

