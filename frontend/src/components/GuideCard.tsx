interface GuideCardProps {
  title: string;
  description?: string;
  image?: 'scam' | 'korean' | 'hiring' | 'insurance';
}

export const GuideCard = ({ title, description, image }: GuideCardProps) => {
  return (
    <div className="bg-white rounded-card-sm overflow-hidden shadow-card hover:shadow-soft 
                  transition-all cursor-pointer w-full h-[160px] flex flex-col">
      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Image icon area */}
        <div className="mb-2">
          {image === 'scam' && (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 
                          flex items-center justify-center border border-red-100">
              <div className="text-center">
                <span className="text-xl">⚠️</span>
              </div>
            </div>
          )}
          {image === 'korean' && (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-red-50 
                          flex items-center justify-center border border-blue-100">
              <div className="text-center">
                <span className="text-xl">🇰🇷</span>
              </div>
            </div>
          )}
          {image === 'hiring' && (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 
                          flex items-center justify-center border border-blue-100">
              <div className="text-center">
                <span className="text-xl">👨‍💼</span>
              </div>
            </div>
          )}
          {image === 'insurance' && (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 
                          flex items-center justify-center border border-green-100">
              <div className="text-center">
                <span className="text-xl">📋</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-[13px] font-bold text-text-900 leading-snug line-clamp-3">
          {title}
        </h3>
      </div>
    </div>
  );
};

