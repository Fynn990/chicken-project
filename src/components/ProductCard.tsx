
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="product-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card-image relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay buttons on hover */}
        <div 
          className={`absolute inset-0 bg-black/30 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleAddToCart}
            className="p-2 rounded-full bg-white text-foreground shadow-lg hover:bg-cartus-primary hover:text-white transition-colors duration-300"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="p-2 rounded-full bg-white text-foreground shadow-lg hover:bg-cartus-primary hover:text-white transition-colors duration-300"
            aria-label="View product"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      <div className="p-2">
        {/* Tags */}
        <div className="flex gap-2 mb-2">
          {product.isOrganic && (
            <span className="text-xs py-0.5 px-2 bg-green-100 text-green-800 rounded-full">
              Organic
            </span>
          )}
          {product.isFreeRange && (
            <span className="text-xs py-0.5 px-2 bg-cartus-accent/20 text-cartus-accent rounded-full">
              Free Range
            </span>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-medium text-foreground group-hover:text-cartus-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-cartus-accent text-cartus-accent' 
                    : 'text-cartus-neutral'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
