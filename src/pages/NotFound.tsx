
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-7xl font-bold text-cartus-primary mb-6">404</h1>
          <p className="text-xl text-foreground mb-8">
            Oops! We couldn't find the page you're looking for.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-cartus-primary text-white font-medium hover:bg-cartus-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
