
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/AuthForm';

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
          Swipe N' Bite
        </h1>
        <p className="text-muted-foreground">
          Discover your next favorite restaurant with a swipe
        </p>
      </div>
      
      <AuthForm />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p className="mb-1">Demo credentials:</p>
        <p>Email: jane@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
};

export default Auth;
