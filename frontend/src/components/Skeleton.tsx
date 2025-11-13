export const Skeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
};

export const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[16px] p-4 border-2 border-gray-200 min-w-[320px] w-[320px] snap-start">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-32 mb-1" />
      <Skeleton className="h-4 w-28 mb-3" />
      <Skeleton className="h-5 w-24 mb-3" />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-[8px]" />
          <Skeleton className="h-6 w-16 rounded-[8px]" />
        </div>
        <Skeleton className="h-7 w-16 rounded-[8px]" />
      </div>
    </div>
  );
};

