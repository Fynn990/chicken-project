
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const handleLogout = () => {
    logout();
  };
  
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/9598d1a9-b4f8-4364-8815-73325456b8b4.png" 
              alt="Cartus Agri Logo" 
              className="h-10 w-10 mr-2"
            />
            <span className="text-xl font-semibold text-cartus-primary">Cartus Agri</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-cartus-primary ${
                  location.pathname === link.path ? 'text-cartus-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-cartus-neutral/10 transition-colors duration-200">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs font-medium text-white bg-cartus-primary rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2 rounded-full hover:bg-cartus-neutral/10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full cursor-pointer">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-sm font-medium px-4 py-2 rounded-full border border-cartus-primary text-cartus-primary hover:bg-cartus-primary/10 transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="text-sm font-medium px-4 py-2 rounded-full bg-cartus-primary text-white hover:bg-cartus-primary/90 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slideDown bg-white shadow-lg rounded-b-lg mt-1 py-4">
            <div className="px-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path ? 'text-cartus-primary' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-cartus-neutral/20">
                <Link to="/cart" className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({cartItemCount})</span>
                </Link>
                
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center space-x-1 text-red-500" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link 
                      to="/login" 
                      className="text-sm font-medium px-4 py-2 rounded-full border border-cartus-primary text-cartus-primary text-center"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="text-sm font-medium px-4 py-2 rounded-full bg-cartus-primary text-white text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
