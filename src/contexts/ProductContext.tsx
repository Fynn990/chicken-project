
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  bestSellers: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

// Sample product data
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Whole Free-Range Chicken',
    description: 'Farm-fresh, free-range whole chicken raised on open pastures with natural feed, no antibiotics or hormones.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518492104633-130d6fed4a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'whole',
    stock: 25,
    rating: 4.8,
    reviewCount: 124,
    isOrganic: true,
    isFreeRange: true,
    featured: true,
    sold: 780,
  },
  {
    id: 'p2',
    name: 'Chicken Breast Fillets',
    description: 'Premium skinless chicken breast fillets, perfect for grilling or baking. Lean, high-protein option.',
    price: 12.99,
    oldPrice: 14.99,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 48,
    rating: 4.6,
    reviewCount: 89,
    isOrganic: true,
    isFreeRange: true,
    featured: true,
    sold: 1200,
  },
  {
    id: 'p3',
    name: 'Chicken Thighs',
    description: 'Juicy, flavorful chicken thighs with skin-on. Perfect for roasting, grilling, or slow cooking.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 36,
    rating: 4.7,
    reviewCount: 67,
    isOrganic: true,
    isFreeRange: true,
    featured: false,
    sold: 950,
  },
  {
    id: 'p4',
    name: 'Chicken Wings',
    description: 'Fresh chicken wings, perfect for baking, frying, or grilling. Great for parties and game days.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 52,
    rating: 4.5,
    reviewCount: 78,
    isOrganic: false,
    isFreeRange: true,
    featured: true,
    sold: 1050,
  },
  {
    id: 'p5',
    name: 'Chicken Drumsticks',
    description: 'Tender and flavorful chicken drumsticks, perfect for baking, grilling, or frying.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 40,
    rating: 4.4,
    reviewCount: 56,
    isOrganic: false,
    isFreeRange: true,
    featured: false,
    sold: 820,
  },
  {
    id: 'p6',
    name: 'Organic Chicken Liver',
    description: 'Fresh organic chicken liver, rich in iron and nutrients. Perfect for traditional recipes.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1602470521006-dfc86da9be6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1602470521006-dfc86da9be6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'organs',
    stock: 20,
    rating: 4.2,
    reviewCount: 34,
    isOrganic: true,
    isFreeRange: true,
    featured: false,
    sold: 340,
  },
  {
    id: 'p7',
    name: 'Premium Chicken Sausages',
    description: 'Handcrafted chicken sausages with premium herbs and spices. No fillers or artificial ingredients.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1604503468605-19cf3cdacb21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1604503468605-19cf3cdacb21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'processed',
    stock: 30,
    rating: 4.8,
    reviewCount: 42,
    isOrganic: true,
    isFreeRange: true,
    featured: true,
    sold: 560,
  },
  {
    id: 'p8',
    name: 'Marinated Chicken Kebabs',
    description: 'Ready-to-grill chicken kebabs marinated in our special herb blend. Perfect for BBQs.',
    price: 11.99,
    oldPrice: 13.99,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'processed',
    stock: 25,
    rating: 4.7,
    reviewCount: 38,
    isOrganic: false,
    isFreeRange: true,
    featured: false,
    sold: 480,
  },
  // Adding more products
  {
    id: 'p9',
    name: 'Organic Ground Chicken',
    description: 'Finely ground premium chicken meat, perfect for burgers, meatballs, or any recipe requiring ground meat.',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'processed',
    stock: 45,
    rating: 4.6,
    reviewCount: 52,
    isOrganic: true,
    isFreeRange: true,
    featured: true,
    sold: 890,
  },
  {
    id: 'p10',
    name: 'Chicken Soup Bones',
    description: 'Perfect bones for making rich, flavorful homemade chicken broth or stock. Packed with nutrients.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1551649556-2cc408a7c7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1551649556-2cc408a7c7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 60,
    rating: 4.3,
    reviewCount: 28,
    isOrganic: true,
    isFreeRange: true,
    featured: false,
    sold: 420,
  },
  {
    id: 'p11',
    name: 'Premium Chicken Tenderloin',
    description: 'Ultra-tender chicken tenderloin strips, perfect for quick and healthy meals. Minimal preparation required.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 35,
    rating: 4.9,
    reviewCount: 64,
    isOrganic: true,
    isFreeRange: true,
    featured: true,
    sold: 910,
  },
  {
    id: 'p12',
    name: 'Chicken Feet',
    description: 'Traditional ingredient for soups and broths. Rich in collagen and nutrients for joint health.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1609252880722-cfa0dd6a849c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1609252880722-cfa0dd6a849c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    category: 'parts',
    stock: 30,
    rating: 4.1,
    reviewCount: 19,
    isOrganic: true,
    isFreeRange: true,
    featured: false,
    sold: 240,
  },
];

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  
  // Load products on initial render
  useEffect(() => {
    // In a real app, you would fetch from an API
    setProducts(SAMPLE_PRODUCTS);
  }, []);
  
  // Derived product lists
  const featuredProducts = products.filter(product => product.featured);
  const bestSellers = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  
  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };
  
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };
  
  const searchProducts = (query: string) => {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
  };
  
  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        bestSellers,
        getProductById,
        getProductsByCategory,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
