import apiClient from './client';
import type {
  Job,
  Application,
  JobSeeker,
  Employer,
  Message,
  Conversation,
  LearningProgress,
  User,
} from '@/types';

// Auth
export const authAPI = {
  signin: (email: string, password: string) =>
    apiClient.post<{ user: User; token: string }>('/auth/signin', { email, password }),
  signup: (email: string, password: string, role: string) =>
    apiClient.post<{ user: User; token: string }>('/auth/signup', { email, password, role }),
};

// Jobs
export const jobsAPI = {
  list: (params?: {
    query?: string;
    location?: string;
    industry?: string;
    languageLevel?: string;
    visaType?: string;
    limit?: number;
    offset?: number;
  }) => apiClient.get<Job[]>('/jobs', { params }),
  get: (id: string) => apiClient.get<Job>(`/jobs/${id}`),
};

// Applications
export const applicationsAPI = {
  create: (seekerId: string, jobId: string) =>
    apiClient.post<Application>('/applications', { seekerId, jobId }),
  list: (seekerId?: string, jobId?: string) =>
    apiClient.get<Application[]>('/applications', { params: { seekerId, jobId } }),
  update: (id: string, status: string) =>
    apiClient.patch<Application>(`/applications/${id}`, { status }),
};

// Users
export const usersAPI = {
  getJobSeeker: (id: string) => apiClient.get<JobSeeker>(`/jobseekers/${id}`),
  getEmployer: (id: string) => apiClient.get<Employer>(`/employers/${id}`),
};

// Conversations
export const conversationsAPI = {
  list: (userId: string) => apiClient.get<Conversation[]>(`/conversations/${userId}`),
};

// Messages
export const messagesAPI = {
  list: (conversationId: string, cursor?: string, limit?: number) =>
    apiClient.get<{ messages: Message[]; nextCursor?: string }>(
      `/conversations/${conversationId}/messages`,
      { params: { cursor, limit } }
    ),
  send: (conversationId: string, senderId: string, text: string) =>
    apiClient.post<Message>('/messages', { conversationId, senderId, text }),
  markRead: (messageId: string) =>
    apiClient.post('/messages/read', { messageId }),
};

// Translate
export const translateAPI = {
  translate: (messageId: string, text: string, targetLang: string) =>
    apiClient.post<{ translatedText: string }>('/translate', { messageId, text, targetLang }),
};

// Learning
export const learningAPI = {
  getSummary: (seekerId: string) =>
    apiClient.get<LearningProgress>('/learning/summary', { params: { seekerId } }),
  submitLevelTest: (seekerId: string, answers: any) =>
    apiClient.post('/leveltest', { seekerId, answers }),
};

export default {
  auth: authAPI,
  jobs: jobsAPI,
  applications: applicationsAPI,
  users: usersAPI,
  conversations: conversationsAPI,
  messages: messagesAPI,
  translate: translateAPI,
  learning: learningAPI,
};

