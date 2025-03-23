
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function SwipeButtons({ onSwipeLeft, onSwipeRight }: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <Button
        onClick={onSwipeLeft}
        variant="outline"
        size="lg"
        className="h-16 w-16 rounded-full border-2 border-red-500 bg-white hover:bg-red-50 transition-all duration-300"
      >
        <ThumbsDown className="h-6 w-6 text-red-500" />
      </Button>
      
      <Button
        onClick={onSwipeRight}
        variant="outline"
        size="lg"
        className="h-16 w-16 rounded-full border-2 border-green-500 bg-white hover:bg-green-50 transition-all duration-300"
      >
        <ThumbsUp className="h-6 w-6 text-green-500" />
      </Button>
    </div>
  );
}
