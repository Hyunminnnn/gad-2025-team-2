import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content with mobile-first design */}
      <div className="mx-auto max-w-[480px] bg-white min-h-screen relative shadow-xl">
        <Outlet />
      </div>
      
      {/* Bottom navigation */}
      <BottomNav />
    </div>
  );
};

