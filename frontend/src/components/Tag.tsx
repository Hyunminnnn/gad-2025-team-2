import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'mint' | 'gray' | 'outline-mint' | 'outline-gray';
  size?: 'sm' | 'md';
  onClick?: () => void;
  active?: boolean;
}

export const Tag = ({ 
  children, 
  variant = 'outline-gray', 
  size = 'md',
  onClick,
  active = false,
}: TagProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all';
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-[13px] rounded-chip',
    md: 'px-4 py-2 text-[14px] rounded-chip',
  };
  
  const variantClasses = {
    mint: 'bg-primary-mint text-white',
    gray: 'bg-badge-gray text-badge-text',
    'outline-mint': active 
      ? 'bg-mint-50 text-primary-mint border-2 border-primary-mint'
      : 'bg-white text-text-secondary border-2 border-border',
    'outline-gray': active
      ? 'bg-mint-50 text-primary-mint border-2 border-primary-mint'
      : 'bg-badge-gray text-text-secondary border-2 border-transparent',
  };

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${onClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
      `}
      type="button"
    >
      {children}
    </button>
  );
};

