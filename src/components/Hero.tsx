
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="absolute inset-0 bg-gradient-to-r from-cartus-primary/10 to-cartus-background -z-10" />
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620583787730-41fd1490111b?q=80&w=2070')] bg-cover bg-center opacity-20" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          <div className="space-y-8 animate-slideUp">
            <div>
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-cartus-accent/20 text-cartus-accent mb-4">
                Farm to Table
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Fresh Chicken, <span className="text-cartus-primary">Naturally Raised</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/80 max-w-xl">
                Experience premium quality, ethically raised chicken from our family farm to your table. Taste the difference of Cartus Agri.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="px-6 py-3 rounded-full bg-cartus-primary text-white font-medium hover:bg-cartus-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 rounded-full bg-transparent border border-cartus-primary text-cartus-primary font-medium hover:bg-cartus-primary/5 transition-all duration-300 flex items-center gap-2"
              >
                Our Story
              </Link>
            </div>
          </div>
          
          <div className="relative h-[400px] lg:h-[500px] animate-fadeIn">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-cartus-accent/50 rounded-full blur-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=3088&auto=format&fit=crop" 
              alt="Free range chicken" 
              className="absolute top-0 right-0 md:right-10 h-full w-auto object-contain rounded-xl animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
