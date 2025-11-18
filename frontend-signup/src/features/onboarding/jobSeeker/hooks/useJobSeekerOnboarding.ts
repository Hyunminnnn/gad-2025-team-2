import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingStep, OnboardingFormValues } from '../types';
import { createJobSeekerProfile } from '../api';

const INITIAL_VALUES: OnboardingFormValues = {
  uploadedFiles: [],
  preferredRegions: [],
  preferredJobs: [],
};

export function useJobSeekerOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>(1);
  const [values, setValues] = useState<OnboardingFormValues>(INITIAL_VALUES);
  const [showStartInfoModal, setShowStartInfoModal] = useState(true);
  const [showStepIntroSheet, setShowStepIntroSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const goNext = () => {
    if (step < 4) {
      setStep((prev) => (prev + 1) as OnboardingStep);
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as OnboardingStep);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setValues((prev) => ({ ...prev, uploadedFiles: files }));
  };

  const handleRegionSelect = (regions: string[]) => {
    setValues((prev) => ({ ...prev, preferredRegions: regions }));
  };

  const handleJobToggle = (jobId: string) => {
    setValues((prev) => {
      const currentJobs = prev.preferredJobs;
      const isSelected = currentJobs.includes(jobId);
      return {
        ...prev,
        preferredJobs: isSelected
          ? currentJobs.filter((id) => id !== jobId)
          : [...currentJobs, jobId],
      };
    });
  };

  const handleStartInfoModalClose = (goToSettings: boolean) => {
    setShowStartInfoModal(false);
    if (goToSettings) {
      setShowStepIntroSheet(true);
    }
  };

  const handleStepIntroStart = () => {
    setShowStepIntroSheet(false);
    setStep(2);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Get user_id from localStorage (set during signup)
      const userId = localStorage.getItem('signup_user_id');
      if (!userId) {
        throw new Error('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      }

      const payload = {
        user_id: userId,
        basic_info_file_name:
          values.uploadedFiles.length > 0
            ? values.uploadedFiles[0].name
            : null,
        preferred_regions: values.preferredRegions,
        preferred_jobs: values.preferredJobs,
      };

      await createJobSeekerProfile(payload);
      router.push('/');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '프로필 저장에 실패했습니다.';
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    values,
    setValues,
    goNext,
    goPrev,
    handleFileUpload,
    handleRegionSelect,
    handleJobToggle,
    showStartInfoModal,
    showStepIntroSheet,
    handleStartInfoModalClose,
    handleStepIntroStart,
    closeStepIntroSheet: () => setShowStepIntroSheet(false),
    handleSubmit,
    isSubmitting,
    error,
  };
}

