import { getRatingColorClass } from '@/lib/utils';

interface UserHandleProps {
  handle: string;
  rating?: number;
  className?: string;
}

export default function UserHandle({ handle, rating, className = '' }: UserHandleProps) {
  if (rating === undefined) {
    return <span className={className}>{handle}</span>;
  }

  const colorClass = getRatingColorClass(rating);
  
  // Legendary Grandmaster (Rating >= 3000): First letter is black (or white in dark mode), rest is red
  if (rating >= 3000) {
    return (
      <span className={`font-bold ${className}`}>
        <span className="text-white first-letter">{handle[0]}</span>
        <span className="text-red-500">{handle.slice(1)}</span>
      </span>
    );
  }

  return (
    <span className={`font-bold ${colorClass} ${className}`}>
      {handle}
    </span>
  );
}