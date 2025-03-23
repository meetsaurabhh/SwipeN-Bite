
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useRestaurants } from '@/hooks/useRestaurants';
import { Navbar } from '@/components/Navbar';
import { FoodItemCard } from '@/components/FoodItemCard';
import { SwipeButtons } from '@/components/SwipeButtons';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { 
    currentFoodItem, 
    isLoading, 
    fetchFoodItems, 
    saveFoodItem, 
    skipFoodItem 
  } = useRestaurants();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      // Make sure food items are fetched when the component mounts
      fetchFoodItems();
    }
  }, [isAuthenticated, navigate, fetchFoodItems]);

  const handleSwipeRight = () => {
    if (currentFoodItem) {
      saveFoodItem(currentFoodItem);
    }
  };

  const handleSwipeLeft = () => {
    skipFoodItem();
  };

  console.log('Current food item in Home:', currentFoodItem);
  console.log('Loading state:', isLoading);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 page-container py-12">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl font-bold">Discover Delicious Food</h1>
          <p className="text-muted-foreground mt-2">
            Swipe right to save, swipe left to skip
          </p>
        </div>
        
        <div className="swipe-card-container">
          {isLoading ? (
            <div className="swipe-card glass-card animate-pulse">
              <Skeleton className="h-1/2 w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            </div>
          ) : currentFoodItem ? (
            <FoodItemCard
              foodItem={currentFoodItem}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ) : (
            <div className="swipe-card glass-card flex items-center justify-center">
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-2">No more food items</h3>
                <p className="text-muted-foreground">
                  You've seen all the food items in your area. Check back later for more!
                </p>
              </div>
            </div>
          )}
        </div>
        
        {currentFoodItem && (
          <SwipeButtons
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
