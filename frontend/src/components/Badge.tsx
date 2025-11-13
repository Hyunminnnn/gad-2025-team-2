import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'mint' | 'danger' | 'gray' | 'white';
  size?: 'sm' | 'md';
}

export const Badge = ({ children, variant = 'gray', size = 'sm' }: BadgeProps) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const variantClasses = {
    mint: 'bg-mint-50 text-primary-mint border border-primary-mint',
    danger: 'bg-dangerLight text-danger border border-danger',
    gray: 'bg-badge-gray text-badge-text',
    white: 'bg-white text-text-secondary border border-border',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-md font-medium
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
    >
      {children}
    </span>
  );
};

