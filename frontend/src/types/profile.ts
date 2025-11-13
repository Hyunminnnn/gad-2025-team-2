export type Role = 'jobseeker' | 'employer';
export type VerifyState = 'verified' | 'pending' | 'failed' | 'not_required';

export interface Profile {
  name: string;
  role: Role;
  avatarUrl?: string;
  joinedAtISO: string;
  metrics: {
    matches?: number;
    reviews: number;
  };
}

export interface Verifications {
  idVerified: VerifyState;
  visaVerified: VerifyState;
  contactVerified: VerifyState;
  educationVerified: VerifyState;
  criminalRecordVerified: VerifyState;
  lastUpdatedISO: string;
}

export interface Resume {
  birthYear?: number;
  country?: string;
  city?: string;
  nationality?: string;
  visaType?: string;
  visaExpiryISO?: string;
  languages: {
    code: string;
    level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  }[];
  desiredRoles: string[];
  skills: string[];
  availability?: {
    days: string[];
    timeRange: string;
  };
  hobbies?: string[];
  pets?: string;
  introShort?: string;
  introLong?: string;
  contacts: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    kakao?: string;
  };
}

