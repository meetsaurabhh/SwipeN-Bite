import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRestaurants } from '@/hooks/useRestaurants';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ExternalLink, MapPin, Trash2 } from 'lucide-react';
import { RatingDisplay } from '@/components/ui/RatingDisplay';

const EatList = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { savedFoodItems, removeFromSaved } = useRestaurants();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 page-container py-12">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold">Your Eat-List</h1>
          <p className="text-muted-foreground mt-2">
            Restaurants you've saved for later
          </p>
        </div>
        
        {savedFoodItems.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <h3 className="text-xl font-semibold mb-2">Your Eat-List is empty</h3>
            <p className="text-muted-foreground mb-6">
              Start swiping to add restaurants to your list
            </p>
            <Button onClick={() => navigate('/home')}>
              Discover Restaurants
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedFoodItems.map((foodItem) => (
              <Card key={foodItem.id} className="card-hover animate-scale-in">
                <div 
                  className="h-40 bg-cover bg-center rounded-t-lg" 
                  style={{ backgroundImage: `url(${foodItem.image})` }}
                />
                
                <CardHeader className="pb-2">
                  <CardTitle>{foodItem.restaurant.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {foodItem.restaurant.address}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <RatingDisplay 
                      rating={foodItem.restaurant.rating} 
                      reviewCount={foodItem.restaurant.reviewCount}
                      size="sm"
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                    <p className="text-xs">{foodItem.restaurant.timings}</p>
                  </div>
                  
                  <p className="text-sm line-clamp-2">{foodItem.restaurant.description}</p>
                </CardContent>
                
                <CardFooter className="flex gap-2 justify-between">
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
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-destructive hover:bg-destructive/10 h-8 w-8"
                    onClick={() => removeFromSaved(foodItem.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default EatList;
