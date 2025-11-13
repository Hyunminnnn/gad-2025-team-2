import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, icon, action, children, className = '' }: SectionProps) => {
  return (
    <section className={`py-4 ${className}`}>
      <div className="flex items-center justify-between mb-4 px-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h2 className="text-[17px] font-bold text-text-primary">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
};

