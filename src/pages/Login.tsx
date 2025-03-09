
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // If already authenticated, redirect to home
  if (isAuthenticated) {
    navigate('/');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    
    setIsLoading(false);
    
    if (success) {
      // If admin, redirect to admin dashboard
      if (email === 'admin@cartusagri.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-cartus-primary hover:bg-cartus-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                <strong>Demo Accounts:</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Admin: admin@cartusagri.com / admin123
              </p>
              <p className="text-xs text-gray-500">
                User: user@example.com / user123
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
