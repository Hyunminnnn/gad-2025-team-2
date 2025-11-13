interface DateDividerProps {
  date: string;
}

export const DateDivider = ({ date }: DateDividerProps) => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="px-3 py-1 bg-gray-100 rounded-full">
        <span className="text-[12px] text-text-secondary">{date}</span>
      </div>
    </div>
  );
};

