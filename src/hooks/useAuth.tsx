import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/utils/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  selectedCity: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  setSelectedCity: (city: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('swipe-n-bite-user');
    const savedCity = localStorage.getItem('swipe-n-bite-city');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('swipe-n-bite-users') || '[]');
    
    // Check if email already exists
    if (existingUsers.some((u: User) => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already exists",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password, // In a real app, this would be hashed
    };

    // Add user to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('swipe-n-bite-users', JSON.stringify(existingUsers));

    // Auto login after registration
    setUser(newUser);
    localStorage.setItem('swipe-n-bite-user', JSON.stringify(newUser));

    toast({
      title: "Registration successful",
      description: `Welcome to Swipe N' Bite, ${username}!`,
      duration: 3000,
    });
    return true;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('swipe-n-bite-users') || '[]');
    
    // Check if user exists
    const foundUser = existingUsers.find((u: User) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('swipe-n-bite-user', JSON.stringify(foundUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.username}!`,
        duration: 3000,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
        duration: 3000,
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setSelectedCity(null);
    localStorage.removeItem('swipe-n-bite-user');
    localStorage.removeItem('swipe-n-bite-city');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('swipe-n-bite-city', city);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedCity,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        setSelectedCity: handleCitySelect
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
