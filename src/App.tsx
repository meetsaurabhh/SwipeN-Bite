import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { RestaurantsProvider } from '@/hooks/useRestaurants';
import Home from '@/pages/Home';
import EatList from '@/pages/EatList';
import Auth from '@/pages/Auth';
import FoodCupidPage from '@/pages/FoodBuddiesPage';
import TweetAbout from '@/pages/TweetAbout';
import { LocationSelect } from '@/components/LocationSelect';

const queryClient = new QueryClient();

function LocationSelectWrapper() {
  const { setSelectedCity } = useAuth();
  return <LocationSelect onLocationSelect={setSelectedCity} />;
}

function AppRoutes() {
  const { isAuthenticated, selectedCity } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  if (!selectedCity) {
    return (
      <Routes>
        <Route path="/select-location" element={<LocationSelectWrapper />} />
        <Route path="*" element={<Navigate to="/select-location" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/eat-list" element={<EatList />} />
      <Route path="/food-cupid" element={<FoodCupidPage />} />
      <Route path="/tweet-about" element={<TweetAbout />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <RestaurantsProvider>
            <Router>
              <AppRoutes />
              <Toaster />
            </Router>
          </RestaurantsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
