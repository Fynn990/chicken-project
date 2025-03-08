
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProducts } from '../contexts/ProductContext';

const FeaturedProducts = () => {
  const { products } = useProducts();
  
  // Get featured products (first 4 products for now)
  const featuredProducts = products.slice(0, 4);
  
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-wrap justify-between items-end gap-4">
        <div>
          <span className="text-sm font-medium text-cartus-primary">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Products</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Discover our selection of premium, farm-fresh chicken products, 
            ethically raised with care and delivered with quality.
          </p>
        </div>
        
        <Link 
          to="/shop" 
          className="group flex items-center text-cartus-primary font-medium"
        >
          View All Products
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="animate-slideUp" style={{ animationDelay: `${featuredProducts.indexOf(product) * 0.1}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
