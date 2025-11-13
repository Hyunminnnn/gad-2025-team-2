import { useTranslation } from 'react-i18next';

interface StatCardProps {
  stats: {
    directApplication: number;
    screening: number;
    documentPass: number;
  };
}

export const StatCard = ({ stats }: StatCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-primary-mint to-[#2AA990] rounded-card p-5 text-white relative overflow-hidden">
      {/* Background illustration area */}
      <div className="absolute right-0 top-0 w-40 h-40 opacity-20">
        <div className="absolute right-4 top-4 w-32 h-32 bg-white rounded-full" />
      </div>

      <h3 className="text-[15px] font-semibold mb-3 relative z-10">
        {t('home.applicationStatusQuestion')}
      </h3>

      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 text-primary-mint rounded-full text-[13px] font-semibold">
              {t('home.directApplication')}
            </span>
            <span className="text-[20px] font-bold">{stats.directApplication}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 text-primary-mint rounded-full text-[13px] font-semibold">
              {t('home.screening')}
            </span>
            <span className="text-[20px] font-bold">{stats.screening}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 text-primary-mint rounded-full text-[13px] font-semibold">
              {t('home.documentPass')}
            </span>
            <span className="text-[20px] font-bold">{stats.documentPass}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

