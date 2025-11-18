export type OnboardingStep = 1 | 2 | 3 | 4;

export interface OnboardingFormValues {
  // Step 2: Basic Info Upload
  uploadedFiles: File[];
  // Step 3: Preferred Region
  preferredRegions: string[];
  // Step 4: Preferred Job
  preferredJobs: string[];
}

export interface JobCategory {
  id: string;
  label: string;
  icon?: string;
}

