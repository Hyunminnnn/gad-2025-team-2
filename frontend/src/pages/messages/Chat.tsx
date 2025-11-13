import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageBubble } from '@/components/MessageBubble';
import { MessageInput } from '@/components/MessageInput';
import type { Message, Conversation } from '@/types/message';

export const Chat = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [userLang] = useState('ko'); // 사용자 선호 언어 (실제로는 설정에서 가져옴)
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      fetchConversation();
      fetchMessages();
      markAsRead();
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversation = async () => {
    try {
      // Mock data - 실제로는 API 호출
      // const response = await fetch(`/api/conversations/${id}`);
      // const data = await response.json();
      
      const mockConversation: Conversation = {
        id: id!,
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
            role: 'employer',
            profileImageUrl: undefined
          }
        ],
        unreadCount: 0,
        updatedAt: new Date().toISOString(),
        jobTitle: '카페 바리스타',
        jobId: 'job-1'
      };

      setConversation(mockConversation);
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      
      // Mock data - 실제로는 API 호출
      // const response = await fetch(`/api/conversations/${id}/messages?limit=50`);
      // const data = await response.json();
      
      const mockMessages: Message[] = [
        {
          id: 'msg-1',
          conversationId: id!,
          senderId: 'user-2',
          text: '안녕하세요! 지원해주셔서 감사합니다.',
          detectedLang: 'ko',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          readAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'msg-2',
          conversationId: id!,
          senderId: 'user-1',
          text: 'Salom! Men bu ishga juda qiziqaman. Iltimos, menga ko\'proq ma\'lumot bering.',
          detectedLang: 'uz',
          createdAt: new Date(Date.now() - 7000000).toISOString(),
          readAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'msg-3',
          conversationId: id!,
          senderId: 'user-2',
          text: '네, 시급은 12,000원이고 주 3일 근무입니다. 면접 가능하신가요?',
          detectedLang: 'ko',
          createdAt: new Date(Date.now() - 6800000).toISOString(),
          readAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 'msg-4',
          conversationId: id!,
          senderId: 'user-1',
          text: '네, 내일 면접 가능합니다!',
          detectedLang: 'ko',
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          readAt: new Date(Date.now() - 60000).toISOString()
        },
        {
          id: 'msg-5',
          conversationId: id!,
          senderId: 'user-2',
          text: '좋습니다! 내일 오후 2시에 매장으로 오시면 됩니다.',
          detectedLang: 'ko',
          createdAt: new Date(Date.now() - 600000).toISOString()
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      // await fetch(`/api/messages/read`, {
      //   method: 'POST',
      //   body: JSON.stringify({ conversationId: id, userId: 'user-1' })
      // });
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleSendMessage = async (text: string) => {
    const tempId = `temp-${Date.now()}`;
    const newMessage: Message = {
      id: tempId,
      conversationId: id!,
      senderId: 'user-1', // 현재 사용자
      text,
      detectedLang: 'ko',
      createdAt: new Date().toISOString(),
      status: 'sending'
    };

    // Optimistic update
    setMessages(prev => [...prev, newMessage]);
    setSending(true);

    try {
      // 실제로는 API 호출
      // const response = await fetch('/api/messages', {
      //   method: 'POST',
      //   body: JSON.stringify({ conversationId: id, senderId: 'user-1', text })
      // });
      // const savedMessage = await response.json();

      // Mock: 1초 후 전송 완료
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? { ...msg, id: `msg-${Date.now()}`, status: 'sent' } 
          : msg
      ));
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === tempId 
          ? { ...msg, status: 'failed' } 
          : msg
      ));
    } finally {
      setSending(false);
    }
  };

  const handleTranslate = async (messageId: string): Promise<string> => {
    try {
      // 실제로는 API 호출
      // const response = await fetch('/api/translate', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     messageId,
      //     text: message.text,
      //     sourceLang: message.detectedLang,
      //     targetLang: userLang
      //   })
      // });
      // const data = await response.json();
      // return data.translatedText;

      // Mock: 1초 후 번역 반환
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const message = messages.find(m => m.id === messageId);
      if (message?.text === 'Salom! Men bu ishga juda qiziqaman. Iltimos, menga ko\'proq ma\'lumot bering.') {
        return '안녕하세요! 저는 이 일에 매우 관심이 있습니다. 더 많은 정보를 주시기 바랍니다.';
      }
      
      return '번역된 텍스트 (Mock)';
    } catch (error) {
      console.error('Translation failed:', error);
      throw error;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const grouped: { [date: string]: Message[] } = {};
    
    messages.forEach(msg => {
      const date = new Date(msg.createdAt);
      const dateKey = date.toLocaleDateString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });
    
    return grouped;
  };

  const getOtherParticipant = () => {
    return conversation?.participants.find(p => p.id !== 'user-1') || conversation?.participants[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-mint-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-[14px] text-gray-500">불러오는 중...</p>
        </div>
      </div>
    );
  }

  const other = getOtherParticipant();
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-line-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-text-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            onClick={() => {
              if (conversation?.jobId) {
                navigate(`/jobs/${conversation.jobId}`);
              }
            }}
            className="flex-1 flex items-center gap-3 cursor-pointer hover:opacity-80"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint-100 to-mint-200 flex items-center justify-center overflow-hidden flex-shrink-0">
              {other?.profileImageUrl ? (
                <img src={other.profileImageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl">{other?.role === 'employer' ? '🏢' : '👤'}</span>
              )}
            </div>

            {/* Name & Job */}
            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-semibold text-text-900 truncate">
                {other?.name}
              </h2>
              {conversation?.jobTitle && (
                <p className="text-[13px] text-gray-600 truncate">
                  {conversation.jobTitle}
                </p>
              )}
            </div>
          </div>

          {/* Options Button */}
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-text-700" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Date Divider */}
            <div className="flex items-center justify-center my-4">
              <div className="px-3 py-1 bg-gray-200 rounded-full">
                <span className="text-[12px] text-gray-600 font-medium">{date}</span>
              </div>
            </div>

            {/* Messages */}
            {msgs.map((msg, index) => {
              const isOwn = msg.senderId === 'user-1';
              const prevMsg = msgs[index - 1];
              const showAvatar = !prevMsg || prevMsg.senderId !== msg.senderId;

              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  avatarUrl={other?.profileImageUrl}
                  onTranslate={handleTranslate}
                  userLang={userLang}
                />
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0">
        <MessageInput
          onSend={handleSendMessage}
          disabled={sending}
          placeholder="메시지를 작성하세요..."
        />
      </div>
    </div>
  );
};
