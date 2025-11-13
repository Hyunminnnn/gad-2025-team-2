import { useTranslation } from 'react-i18next';
import { Tag } from './Tag';

interface ProgressCardProps {
  title: string;
  level: string;
  progress: number;
  completed: number;
  total: number;
  onClick?: () => void;
}

export const ProgressCard = ({ title, level, progress, completed, total, onClick }: ProgressCardProps) => {
  const { t } = useTranslation();

  return (
    <div 
      onClick={onClick}
      className="bg-mint-100 rounded-card p-4 cursor-pointer hover:bg-mint-200 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-[12px] text-text-700 mb-1">{title}</p>
          <h3 className="text-[18px] font-semibold text-text-900 mb-2">한국어 학습</h3>
          <span className="inline-block px-[10px] py-[4px] bg-white text-mint-600 rounded-[12px] text-[12px] font-medium">
            {level}
          </span>
        </div>
        <div className="text-right">
          <p className="text-[12px] text-text-700">
            {completed} / {total}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-[10px] bg-white/60 rounded-[8px] overflow-hidden mb-2">
        <div
          className="absolute left-0 top-0 h-full bg-accent-emerald rounded-[8px] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-right">
        <span className="text-[12px] text-text-700">
          {progress}% 완료
        </span>
      </div>
    </div>
  );
};

