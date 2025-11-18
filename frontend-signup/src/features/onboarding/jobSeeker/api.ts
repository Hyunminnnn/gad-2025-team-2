const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface JobSeekerProfilePayload {
  user_id: string;
  basic_info_file_name: string | null;
  preferred_regions: string[];
  preferred_jobs: string[];
}

export interface JobSeekerProfileResponse {
  id: string;
  user_id: string;
  basic_info_file_name: string | null;
  preferred_regions: string[];
  preferred_jobs: string[];
  created_at: string;
  updated_at: string;
}

export async function createJobSeekerProfile(
  payload: JobSeekerProfilePayload
): Promise<JobSeekerProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/job-seeker/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: '프로필 저장에 실패했습니다.',
    }));
    throw new Error(error.detail || '프로필 저장에 실패했습니다.');
  }

  return response.json();
}

export async function getJobSeekerProfile(
  userId: string
): Promise<JobSeekerProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/job-seeker/profile/${userId}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: '프로필을 불러올 수 없습니다.',
    }));
    throw new Error(error.detail || '프로필을 불러올 수 없습니다.');
  }

  return response.json();
}

