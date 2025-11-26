import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface EmployerSignupData {
  name: string;
  email: string;
  businessType: 'business' | 'individual' | '';
  companyName: string;
  address: string;
  addressDetail: string;
  noDetailAddress: boolean;
}

export function useEmployerSignupWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [formData, setFormData] = useState<EmployerSignupData>({
    name: '',
    email: '',
    businessType: '',
    companyName: '',
    address: '',
    addressDetail: '',
    noDetailAddress: false,
  });

  const updateFormData = (updates: Partial<EmployerSignupData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goNext = () => {
    if (step === 1 && !termsAgreed) {
      setShowTermsModal(true);
      return;
    }
    
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const goPrev = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/signup');
    }
  };

  const handleTermsAgree = () => {
    setTermsAgreed(true);
    setShowTermsModal(false);
    setStep(2);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/signup/employer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          business_type: formData.businessType,
          company_name: formData.companyName,
          address: formData.address,
          address_detail: formData.addressDetail,
        }),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.');
      }

      const data = await response.json();
      console.log('고용주 회원가입 성공:', data);
      
      // 회원가입 완료 후 홈으로 이동
      navigate('/employer/home');
    } catch (error) {
      console.error('고용주 회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.length >= 2 && formData.email.includes('@');
      case 2:
        return formData.businessType !== '';
      case 3:
        return formData.companyName.length > 0;
      case 4:
        return formData.address.length > 0 && (formData.addressDetail.length > 0 || formData.noDetailAddress);
      default:
        return false;
    }
  };

  return {
    step,
    formData,
    updateFormData,
    goNext,
    goPrev,
    canProceed,
    showTermsModal,
    setShowTermsModal,
    handleTermsAgree,
  };
}

