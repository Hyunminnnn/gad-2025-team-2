export interface User {
  id: string;
  name: string;
  profileImageUrl?: string;
  nationality?: string;
  role: 'jobseeker' | 'employer';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  detectedLang?: string;
  createdAt: string;
  readAt?: string;
  status?: 'sending' | 'sent' | 'failed';
}

export interface TranslatedMessage {
  messageId: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  provider: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: {
    text: string;
    createdAt: string;
  };
  unreadCount: number;
  updatedAt: string;
  jobTitle?: string;
  jobId?: string;
}

export interface MessageListResponse {
  items: Message[];
  nextCursor?: string;
  hasMore: boolean;
}

