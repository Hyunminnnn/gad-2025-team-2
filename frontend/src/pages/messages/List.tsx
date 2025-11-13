import { Empty } from '@/components/Empty';
import { Header } from '@/components/Header';

export const MessageList = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header title="메시지" />
      <Empty message="메시지가 없습니다" icon="💬" />
    </div>
  );
};

