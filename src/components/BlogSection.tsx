
import { useBlog } from '../contexts/BlogContext';
import { useAuth } from '../contexts/AuthContext';
import BlogCard from './BlogCard';
import { Button } from './ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, PenSquare } from 'lucide-react';
import NewBlogModal from './NewBlogModal';

const BlogSection = () => {
  const { blogs } = useBlog();
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Show only 3 recent blogs on the homepage
  const recentBlogs = blogs.slice(0, 3);
  
  return (
    <section className="py-16 bg-cartus-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div>
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-cartus-primary/20 text-cartus-primary mb-4">
              Our Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Farm Insights & Stories</h2>
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            {isAuthenticated && (
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center mr-4 bg-cartus-primary hover:bg-cartus-primary/90"
              >
                <PenSquare className="mr-2 h-4 w-4" />
                Write a Post
              </Button>
            )}
            
            <Link 
              to="/blog" 
              className="inline-flex items-center text-cartus-primary font-medium group"
            >
              View all posts
              <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        
        {!isAuthenticated && (
          <div className="text-center mt-10">
            <p className="mb-4 text-muted-foreground">
              Want to share your own chicken farming experiences?
            </p>
            <Link to="/login" className="inline-block">
              <Button className="bg-cartus-accent hover:bg-cartus-accent/90">
                Sign in to write a post
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <NewBlogModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
};

export default BlogSection;
