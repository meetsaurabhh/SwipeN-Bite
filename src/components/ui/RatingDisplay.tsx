import { Star, StarHalf } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export function RatingDisplay({ 
  rating = 0, 
  reviewCount, 
  size = 'md',
  showNumber = true,
  className = ''
}: RatingDisplayProps) {
  // Ensure rating is a valid number between 0 and 5
  const validRating = typeof rating === 'number' && !isNaN(rating) 
    ? Math.max(0, Math.min(5, rating))
    : 0;

  const fullStars = Math.floor(validRating);
  const hasHalfStar = (validRating % 1) >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const starSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSizes[size]} fill-yellow-400 text-yellow-400`}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className={`${starSizes[size]} fill-yellow-400 text-yellow-400`}
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${starSizes[size]} text-gray-300`}
          />
        ))}
      </div>
      {showNumber && validRating > 0 && (
        <span className={`${textSizes[size]} font-medium text-gray-600 dark:text-gray-300`}>
          {validRating.toFixed(1)}
          {typeof reviewCount === 'number' && reviewCount > 0 && (
            <span className="text-gray-400 dark:text-gray-500 ml-1">
              ({reviewCount})
            </span>
          )}
        </span>
      )}
    </div>
  );
} 