interface EmptyProps {
  message: string;
  icon?: string;
}

export const Empty = ({ message, icon = '📭' }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-5xl mb-4">{icon}</div>
      <p className="text-text-secondary text-center">{message}</p>
    </div>
  );
};

