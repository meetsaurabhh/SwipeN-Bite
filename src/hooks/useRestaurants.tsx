import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from 'react';
import { FoodItem, foodItems as mockFoodItems } from '../utils/mockData';
import { useToast } from '@/components/ui/use-toast';

interface RestaurantsContextType {
  foodItems: FoodItem[];
  currentFoodItem: FoodItem | null;
  savedFoodItems: FoodItem[];
  savedRestaurants: FoodItem[];
  isLoading: boolean;
  error: string | null;
  fetchFoodItems: () => Promise<void>;
  getNextFoodItem: () => void;
  saveFoodItem: (item: FoodItem) => void;
  skipFoodItem: () => void;
  removeFromSaved: (itemId: string) => void;
}

const RestaurantsContext = createContext<RestaurantsContextType | undefined>(undefined);

export const RestaurantsProvider = ({ children }: { children: ReactNode }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [currentFoodItem, setCurrentFoodItem] = useState<FoodItem | null>(null);
  const [savedFoodItems, setSavedFoodItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unseen, setUnseen] = useState<FoodItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('swipe-n-bite-saved');
    if (saved) {
      const parsedSaved = JSON.parse(saved);
      // Ensure we have complete restaurant data by merging with mockFoodItems
      const completeSavedItems = parsedSaved.map((savedItem: FoodItem) => {
        const completeItem = mockFoodItems.find(item => item.id === savedItem.id);
        return completeItem || savedItem;
      });
      setSavedFoodItems(completeSavedItems);
    }
    
    fetchFoodItems();
  }, []);

  const fetchFoodItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFoodItems(mockFoodItems);
      
      const savedIds = savedFoodItems.map(item => item.id);
      const filtered = mockFoodItems.filter(item => !savedIds.includes(item.id));
      
      console.log('Filtered food items:', filtered);
      setUnseen(filtered);
      
      if (filtered.length > 0) {
        setCurrentFoodItem(filtered[0]);
      } else {
        setCurrentFoodItem(null);
      }
      
    } catch (err) {
      setError('Failed to fetch food items. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to fetch food items",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [savedFoodItems, toast]);

  const getNextFoodItem = () => {
    if (unseen.length <= 1) {
      setCurrentFoodItem(null);
      return;
    }
    
    const nextItems = unseen.slice(1);
    setUnseen(nextItems);
    setCurrentFoodItem(nextItems[0]);
  };

  const saveFoodItem = (item: FoodItem) => {
    // Ensure we have the complete item data
    const completeItem = mockFoodItems.find(mockItem => mockItem.id === item.id) || item;
    const newSaved = [...savedFoodItems, completeItem];
    setSavedFoodItems(newSaved);
    localStorage.setItem('swipe-n-bite-saved', JSON.stringify(newSaved));
    
    toast({
      title: "Food item saved",
      description: `${completeItem.name} added to your Eat-List`,
      duration: 3000,
    });
    
    getNextFoodItem();
  };

  const skipFoodItem = () => {
    getNextFoodItem();
  };

  const removeFromSaved = (itemId: string) => {
    const newSaved = savedFoodItems.filter(item => item.id !== itemId);
    setSavedFoodItems(newSaved);
    localStorage.setItem('swipe-n-bite-saved', JSON.stringify(newSaved));
    
    const itemToAdd = mockFoodItems.find(item => item.id === itemId);
    if (itemToAdd && !unseen.some(item => item.id === itemId)) {
      setUnseen([...unseen, itemToAdd]);
    }
    
    toast({
      title: "Food item removed",
      description: "Food item removed from your Eat-List",
      duration: 3000,
    });
  };

  return (
    <RestaurantsContext.Provider
      value={{
        foodItems,
        currentFoodItem,
        savedFoodItems,
        savedRestaurants: savedFoodItems,
        isLoading,
        error,
        fetchFoodItems,
        getNextFoodItem,
        saveFoodItem,
        skipFoodItem,
        removeFromSaved,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export const useRestaurants = () => {
  const context = useContext(RestaurantsContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantsProvider');
  }
  return context;
};
