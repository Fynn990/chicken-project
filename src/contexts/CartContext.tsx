
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cart: {
    items: CartItem[];
    subtotal: number;
    total: number;
    tax: number;
    shipping: number;
  };
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { toast } = useToast();
  const [cart, setCart] = useState<{
    items: CartItem[];
    subtotal: number;
    total: number;
    tax: number;
    shipping: number;
  }>({
    items: [],
    subtotal: 0,
    total: 0,
    tax: 0,
    shipping: 0,
  });
  
  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Calculate cart totals whenever items change
  useEffect(() => {
    const subtotal = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    
    const tax = subtotal * 0.08; // Assuming 8% tax
    const shipping = subtotal > 100 ? 0 : 12.99; // Free shipping over $100
    
    setCart((prev) => ({
      ...prev,
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping,
    }));
  }, [cart.items]);
  
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItemIndex = prev.items.findIndex(
        (item) => item.product.id === product.id
      );
      
      let newItems;
      
      if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        newItems = [...prev.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item to cart
        newItems = [...prev.items, { product, quantity }];
      }
      
      toast({
        title: 'Added to cart',
        description: `${quantity} × ${product.name} added to your cart`,
      });
      
      return {
        ...prev,
        items: newItems,
      };
    });
  };
  
  const removeFromCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.product.id !== productId),
    }));
    
    toast({
      title: 'Item removed',
      description: 'Item has been removed from your cart',
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  };
  
  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      total: 0,
      tax: 0,
      shipping: 0,
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
