import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RatingDisplay } from '@/components/ui/RatingDisplay';
import { ExternalLink, AlertTriangle } from 'lucide-react';
import { FoodItem } from '@/utils/mockData';

interface FoodItemCardProps {
  foodItem: FoodItem;
  onSave?: () => void;
  onSkip?: () => void;
  showActions?: boolean;
}

export function FoodItemCard({ foodItem, onSave, onSkip, showActions = false }: FoodItemCardProps) {
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${foodItem.image})` }}
      >
        {foodItem.allergies.length > 0 && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Allergens
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{foodItem.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              {foodItem.restaurant.name}
            </CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <RatingDisplay 
                rating={foodItem.rating} 
                reviewCount={foodItem.reviewCount}
                size="sm"
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{foodItem.price}</p>
            <p className="text-sm text-muted-foreground">{foodItem.category}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {foodItem.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {foodItem.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {foodItem.allergies.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-destructive flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Contains Allergens
            </h4>
            <div className="flex flex-wrap gap-2">
              {foodItem.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <a href={foodItem.restaurant.zomatoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <span>Zomato</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          
          <Button asChild variant="outline" size="sm">
            <a href={foodItem.restaurant.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              <span>Directions</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
        
        {showActions && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSkip}>
              Skip
            </Button>
            <Button size="sm" onClick={onSave}>
              Save
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
