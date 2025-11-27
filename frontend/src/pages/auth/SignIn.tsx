import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '@/api/endpoints';

type UserRole = 'job_seeker' | 'employer';

export function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('job_seeker');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    // Validation
    if (role === 'employer' && !email.trim()) {
      toast.error('이메일을 입력해주세요');
      return;
    }
    if (role === 'job_seeker' && !phone.trim()) {
      toast.error('전화번호를 입력해주세요');
      return;
    }
    if (!password.trim()) {
      toast.error('비밀번호를 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      
      const loginData = {
        identifier: role === 'employer' ? email : phone,
        password: password,
        role: role,
      };

      const response = await authAPI.signIn(loginData);
      
      // Store user info
      localStorage.setItem('signup_user_id', response.user_id);
      localStorage.setItem('user_role', role);
      if (response.profile_photo) {
        localStorage.setItem('profile_photo', response.profile_photo);
      }

      toast.success('로그인 성공!');
      
      // Redirect based on role
      if (role === 'employer') {
        navigate('/employer/home');
      } else {
        navigate('/jobseeker/home');
      }
    } catch (error: any) {
      console.error('로그인 실패:', error);
      toast.error(error.response?.data?.detail || '로그인에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={() => navigate('/signup')}
          className="p-2 -ml-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 px-6 pt-8 pb-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-mint-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-2xl font-bold text-text-900 mb-2">WorkFair</h1>
          <p className="text-[15px] text-text-600">로그인하여 시작하세요</p>
        </div>

        {/* Role Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setRole('job_seeker')}
            className={`flex-1 h-[52px] rounded-[12px] text-[16px] font-semibold transition-colors ${
              role === 'job_seeker'
                ? 'bg-mint-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            나는 구직자
          </button>
          <button
            onClick={() => setRole('employer')}
            className={`flex-1 h-[52px] rounded-[12px] text-[16px] font-semibold transition-colors ${
              role === 'employer'
                ? 'bg-mint-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            나는 고용주
          </button>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email or Phone */}
          <div>
            <label className="block text-[14px] font-medium text-text-900 mb-2">
              {role === 'employer' ? '이메일' : '전화번호'}
            </label>
            {role === 'employer' ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full h-[52px] px-4 bg-gray-50 rounded-[12px] border border-gray-200
                         text-[16px] text-text-900 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-mint-600 focus:border-transparent"
              />
            ) : (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="w-full h-[52px] px-4 bg-gray-50 rounded-[12px] border border-gray-200
                         text-[16px] text-text-900 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-mint-600 focus:border-transparent"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-text-900 mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full h-[52px] px-4 pr-12 bg-gray-50 rounded-[12px] border border-gray-200
                         text-[16px] text-text-900 placeholder:text-gray-400
                         focus:outline-none focus:ring-2 focus:ring-mint-600 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[52px] bg-mint-600 text-white rounded-[12px] text-[16px] 
                     font-semibold hover:bg-mint-700 transition-colors disabled:opacity-50 
                     disabled:cursor-not-allowed mt-6"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-[14px] text-gray-600">
              계정이 없으신가요?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-mint-600 font-semibold hover:text-mint-700"
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
