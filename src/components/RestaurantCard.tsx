import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/utils/mockData';
import { ExternalLink, Clock, MapPin, Heart, X, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RatingDisplay } from '@/components/ui/RatingDisplay';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

export function RestaurantCard({ restaurant, onSwipeLeft, onSwipeRight }: RestaurantCardProps) {
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [swiping, setSwiping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate swipe distance
  const swipeDistance = startX !== null && currentX !== null ? currentX - startX : 0;
  
  // Determine swipe direction and apply appropriate class
  const getSwipeClass = () => {
    if (!swiping || Math.abs(swipeDistance) < 50) return '';
    return swipeDistance > 0 ? 'swipe-right-animation' : 'swipe-left-animation';
  };
  
  // Handle touch/mouse start
  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setSwiping(true);
  };
  
  // Handle touch/mouse move
  const handleMove = (clientX: number) => {
    if (startX === null || !swiping) return;
    setCurrentX(clientX);
  };
  
  // Handle touch/mouse end
  const handleEnd = () => {
    if (startX === null || currentX === null) {
      setSwiping(false);
      return;
    }
    
    const swipeThreshold = 100;
    const swipeDistance = currentX - startX;
    
    if (swipeDistance > swipeThreshold) {
      // Swiped right
      onSwipeRight();
    } else if (swipeDistance < -swipeThreshold) {
      // Swiped left
      onSwipeLeft();
    }
    
    setStartX(null);
    setCurrentX(null);
    setSwiping(false);
  };
  
  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    handleEnd();
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startX) return;
    handleMove(e.clientX);
  };
  
  const handleMouseUp = () => {
    handleEnd();
  };
  
  // Calculate card rotation and translation based on swipe
  const cardStyle = {
    transform: swiping && swipeDistance
      ? `translateX(${swipeDistance}px) rotate(${swipeDistance * 0.05}deg)`
      : 'translateX(0) rotate(0)',
    transition: swiping ? 'none' : 'transform 0.3s ease',
  };
  
  return (
    <div 
      ref={cardRef}
      className={`swipe-card glass-card group ${getSwipeClass()}`}
      style={cardStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative h-1/2">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" 
          style={{ backgroundImage: `url(${restaurant.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold drop-shadow-lg">{restaurant.name}</h2>
              <RatingDisplay 
                rating={restaurant.rating} 
                reviewCount={restaurant.reviewCount}
                size="md"
                className="text-white"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {restaurant.cuisine.map((type, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-none"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-muted-foreground group/item hover:text-primary transition-colors">
            <MapPin className="h-4 w-4 mt-1 flex-shrink-0 group-hover/item:text-primary transition-colors" />
            <p className="text-sm">{restaurant.address}</p>
          </div>
          
          <div className="flex items-start gap-2 text-muted-foreground group/item hover:text-primary transition-colors">
            <Clock className="h-4 w-4 mt-1 flex-shrink-0 group-hover/item:text-primary transition-colors" />
            <p className="text-sm">{restaurant.timings}</p>
          </div>

          <div className="flex items-start gap-2 text-muted-foreground group/item hover:text-primary transition-colors">
            <Phone className="h-4 w-4 mt-1 flex-shrink-0 group-hover/item:text-primary transition-colors" />
            <p className="text-sm">{restaurant.phone}</p>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-100">
          <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.description}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="group/btn hover:border-destructive"
              onClick={onSwipeLeft}
            >
              <X className="h-4 w-4 mr-1 group-hover/btn:text-destructive transition-colors" />
              <span className="group-hover/btn:text-destructive transition-colors">Skip</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="group/btn hover:border-primary"
              onClick={onSwipeRight}
            >
              <Heart className="h-4 w-4 mr-1 group-hover/btn:text-primary transition-colors" />
              <span className="group-hover/btn:text-primary transition-colors">Save</span>
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="hover:border-accent">
              <a 
                href={restaurant.zomatoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1"
              >
                <span>Menu</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="hover:border-accent">
              <a 
                href={restaurant.googleMapsLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1"
              >
                <span>Map</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
