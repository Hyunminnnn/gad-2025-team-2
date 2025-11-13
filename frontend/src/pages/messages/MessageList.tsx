import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import type { Conversation } from '@/types/message';

export const MessageList = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recruiting' | 'applying'>('all');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      
      // Mock data - 실제로는 API 호출
      // const response = await fetch('/api/conversations/user-1');
      // const data = await response.json();
      
      const mockConversations: Conversation[] = [
        {
          id: 'conv-1',
          participants: [
            {
              id: 'user-1',
              name: '김수정',
              role: 'jobseeker',
              nationality: '우즈베키스탄'
            },
            {
              id: 'user-2',
              name: '스타벅스 강남점',
              role: 'employer'
            }
          ],
          lastMessage: {
            text: '네, 내일 면접 가능합니다!',
            createdAt: new Date().toISOString()
          },
          unreadCount: 2,
          updatedAt: new Date().toISOString(),
          jobTitle: '카페 바리스타',
          jobId: 'job-1'
        },
        {
          id: 'conv-2',
          participants: [
            {
              id: 'user-1',
              name: '김수정',
              role: 'jobseeker'
            },
            {
              id: 'user-3',
              name: 'CU 신촌점',
              role: 'employer'
            }
          ],
          lastMessage: {
            text: '시급은 협의 가능합니다',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          unreadCount: 0,
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          jobTitle: '편의점 야간 근무',
          jobId: 'job-2'
        }
      ];

      setConversations(mockConversations);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const getOtherParticipant = (conv: Conversation) => {
    return conv.participants.find(p => p.id !== 'user-1') || conv.participants[0];
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = searchQuery === '' || 
      conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      conv.lastMessage?.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === 'all') return true;
    // TODO: 실제로는 conversation metadata로 필터링
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="메시지" />

      {/* Search & Tabs */}
      <div className="bg-white border-b border-line-200">
        {/* Search Bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름이나 메시지 검색"
              className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-[12px] border-none
                       text-[14px] text-text-900 placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-mint-600"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 pb-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setActiveTab('recruiting')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeTab === 'recruiting'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            채용
          </button>
          <button
            onClick={() => setActiveTab('applying')}
            className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
              activeTab === 'applying'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            지원
          </button>
        </div>
      </div>

      {/* Conversation List */}
      <div className="divide-y divide-line-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-mint-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-[14px] text-gray-500">불러오는 중...</p>
            </div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-[15px] font-medium text-text-900 mb-1">메시지가 없습니다</p>
            <p className="text-[13px] text-gray-500 text-center">
              {searchQuery ? '검색 결과가 없습니다' : '대화를 시작해보세요'}
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const other = getOtherParticipant(conv);
            return (
              <div
                key={conv.id}
                onClick={() => navigate(`/messages/chat/${conv.id}`)}
                className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center overflow-hidden">
                      {other.profileImageUrl ? (
                        <img src={other.profileImageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl">{other.role === 'employer' ? '🏢' : '👤'}</span>
                      )}
                    </div>
                    {conv.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-mint-600 rounded-full flex items-center justify-center">
                        <span className="text-[11px] font-bold text-white">
                          {conv.unreadCount > 99 ? '99+' : conv.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-text-900 truncate">
                          {other.name}
                        </h3>
                        {conv.jobTitle && (
                          <p className="text-[12px] text-gray-500 truncate">
                            {conv.jobTitle}
                          </p>
                        )}
                      </div>
                      <span className="text-[12px] text-gray-500 ml-2 flex-shrink-0">
                        {formatTime(conv.updatedAt)}
                      </span>
                    </div>
                    
                    {conv.lastMessage && (
                      <p className={`text-[14px] truncate ${
                        conv.unreadCount > 0 ? 'text-text-900 font-medium' : 'text-gray-600'
                      }`}>
                        {conv.lastMessage.text}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

