
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Layout from '../components/Layout';
import { ChevronRight, Award, Truck, ThumbsUp, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Features section */}
      <section className="py-16 bg-cartus-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-full bg-cartus-primary/10 mb-4">
                <Award className="h-6 w-6 text-cartus-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                Our chickens are raised to the highest standards for superior taste and quality.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-full bg-cartus-accent/10 mb-4">
                <Leaf className="h-6 w-6 text-cartus-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ethically Raised</h3>
              <p className="text-muted-foreground text-sm">
                Free-range chickens raised on open pastures with natural feed and no antibiotics.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-full bg-cartus-primary/10 mb-4">
                <Truck className="h-6 w-6 text-cartus-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Fresh products delivered to your door within 24 hours of your order.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-full bg-cartus-accent/10 mb-4">
                <ThumbsUp className="h-6 w-6 text-cartus-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-muted-foreground text-sm">
                Not happy with your order? We'll make it right with our 100% satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProducts />
      
      {/* Farm story section */}
      <section className="py-20 bg-cartus-neutral/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-fixed bg-center opacity-5" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl animate-float">
              <img 
                src="https://images.unsplash.com/photo-1551598768-2bfb84c1bf23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Our farm" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            
            <div className="space-y-6 animate-slideUp">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-cartus-primary/20 text-cartus-primary mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Farm to Table Since 1985</h2>
              <p className="text-muted-foreground">
                Cartus Agri Ltd. began with a simple mission: to raise chickens the way nature intended. 
                For over 35 years, our family-owned farm has been committed to sustainable and ethical 
                farming practices, providing the highest quality poultry products to our community.
              </p>
              <p className="text-muted-foreground">
                Our chickens are raised on open pastures where they're free to roam, forage, and express 
                their natural behaviors. We never use antibiotics, growth hormones, or artificial feed additives. 
                The result? Healthier, happier chickens that produce more nutritious and flavorful meat.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-cartus-primary font-medium group"
              >
                Learn more about our story
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 bg-cartus-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cartus-primary to-cartus-accent opacity-90" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Taste the Difference of Farm-Fresh Chicken
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Experience the superior taste, tenderness, and quality of our ethically raised, 
            farm-fresh chicken. Browse our selection of premium products today.
          </p>
          <Link 
            to="/shop" 
            className="inline-block px-6 py-3 rounded-full bg-white text-cartus-primary font-medium hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop Our Products
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
