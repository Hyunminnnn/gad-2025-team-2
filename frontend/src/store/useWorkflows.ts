import { create } from 'zustand';
import type { Application, Job } from '@/types';

interface WorkflowState {
  // Jobseeker application flow
  selectedJob: Job | null;
  applicationInProgress: Application | null;
  
  // Employer hiring flow
  selectedApplicant: string | null;
  hiringInProgress: boolean;
  
  // Learning flow
  currentLesson: string | null;
  levelTestInProgress: boolean;
  
  // Actions
  setSelectedJob: (job: Job | null) => void;
  setApplicationInProgress: (application: Application | null) => void;
  setSelectedApplicant: (applicantId: string | null) => void;
  setHiringInProgress: (inProgress: boolean) => void;
  setCurrentLesson: (lessonId: string | null) => void;
  setLevelTestInProgress: (inProgress: boolean) => void;
  resetWorkflows: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  selectedJob: null,
  applicationInProgress: null,
  selectedApplicant: null,
  hiringInProgress: false,
  currentLesson: null,
  levelTestInProgress: false,
  
  setSelectedJob: (job) => set({ selectedJob: job }),
  setApplicationInProgress: (application) => set({ applicationInProgress: application }),
  setSelectedApplicant: (applicantId) => set({ selectedApplicant: applicantId }),
  setHiringInProgress: (inProgress) => set({ hiringInProgress: inProgress }),
  setCurrentLesson: (lessonId) => set({ currentLesson: lessonId }),
  setLevelTestInProgress: (inProgress) => set({ levelTestInProgress: inProgress }),
  resetWorkflows: () => set({
    selectedJob: null,
    applicationInProgress: null,
    selectedApplicant: null,
    hiringInProgress: false,
    currentLesson: null,
    levelTestInProgress: false,
  }),
}));

