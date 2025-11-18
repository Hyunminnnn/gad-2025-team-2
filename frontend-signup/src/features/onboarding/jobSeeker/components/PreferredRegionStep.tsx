'use client';

interface PreferredRegionStepProps {
  selectedRegions: string[];
  onRegionSelect: (regions: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const REGIONS = [
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '광주',
  '대전',
  '울산',
  '세종',
];

export function PreferredRegionStep({
  selectedRegions,
  onRegionSelect,
  onNext,
  onPrev,
}: PreferredRegionStepProps) {
  const handleSelect = (region: string) => {
    if (selectedRegions.includes(region)) {
      onRegionSelect(selectedRegions.filter((r) => r !== region));
    } else {
      onRegionSelect([...selectedRegions, region]);
    }
  };

  const hasSelection = selectedRegions.length > 0;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-white px-4 pb-10 pt-8">
      <header className="mb-6 flex items-center gap-2">
        <button type="button" onClick={onPrev} className="text-lg">
          ←
        </button>
        <span className="flex-1 text-center text-base font-semibold text-gray-900">
          희망 근무 지역
        </span>
      </header>

      <h1 className="mb-2 text-xl font-semibold text-gray-900">
        희망 근무 지역을 선택해주세요
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        원하는 동네의 일자리를 찾아드려요! 지역을 선택해 주세요.
      </p>

      <div className="mb-6 space-y-3">
        {REGIONS.map((region) => {
          const isSelected = selectedRegions.includes(region);
          return (
            <button
              key={region}
              type="button"
              onClick={() => handleSelect(region)}
              className={`w-full rounded-2xl border px-4 py-4 text-left ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{region}</span>
                {isSelected && (
                  <span className="text-emerald-500">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={onNext}
          disabled={!hasSelection}
          className={`h-12 w-full rounded-full text-base font-semibold ${
            hasSelection
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}
