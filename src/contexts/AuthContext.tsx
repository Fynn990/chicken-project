
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);
  
  // This is a mock implementation for frontend-only auth
  // In a real app, you'd call an API endpoint
  const login = async (email: string, password: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo purposes
      // In real app, you'd validate credentials with backend
      if (email === 'admin@cartusagri.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@cartusagri.com',
          role: 'admin',
        };
        
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        toast({
          title: 'Login successful!',
          description: 'Welcome back, Admin!',
        });
        
        return true;
      } else if (email === 'user@example.com' && password === 'user123') {
        const regularUser: User = {
          id: '2',
          name: 'John Doe',
          email: 'user@example.com',
          role: 'user',
        };
        
        setUser(regularUser);
        localStorage.setItem('user', JSON.stringify(regularUser));
        
        toast({
          title: 'Login successful!',
          description: 'Welcome back, John!',
        });
        
        return true;
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
        
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      toast({
        title: 'Login failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd send this to your backend
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: 'Registration successful!',
        description: `Welcome to Cartus Agri, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      
      toast({
        title: 'Registration failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
