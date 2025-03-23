import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { FoodCupid } from '@/components/FoodBuddies';

const FoodCupidPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 page-container py-12">
        <div className="max-w-4xl mx-auto">
          <FoodCupid currentUserId={user.id} />
        </div>
      </main>
    </div>
  );
};

export default FoodCupidPage; 