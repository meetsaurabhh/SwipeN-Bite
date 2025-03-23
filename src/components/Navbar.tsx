import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import { BookmarkIcon, MessageCircle, User, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">Swipe N' Bite</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            to="/eat-list" 
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              isActive('/eat-list') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <BookmarkIcon className="h-4 w-4" />
            <span>Eat-List</span>
          </Link>
          
          <Link 
            to="/food-cupid" 
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              isActive('/food-cupid') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Food Cupid</span>
          </Link>
          
          <Link 
            to="/tweet-about" 
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              isActive('/tweet-about') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>Tweet About</span>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 rounded-full">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Hello, {user?.username || 'User'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
