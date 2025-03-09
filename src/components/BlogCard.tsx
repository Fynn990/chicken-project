
import { Blog } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBlog } from '../contexts/BlogContext';

interface BlogCardProps {
  blog: Blog;
  compact?: boolean;
}

const BlogCard = ({ blog, compact = false }: BlogCardProps) => {
  const { likeBlog } = useBlog();
  
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    likeBlog(blog.id);
  };
  
  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 h-full flex flex-col">
        <div className="mb-3">
          <span className="text-xs font-medium bg-cartus-primary/10 text-cartus-primary py-1 px-2 rounded-full">
            {blog.tags[0]}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{blog.excerpt}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </span>
          <Link 
            to={`/blog/${blog.id}`} 
            className="text-cartus-primary flex items-center text-sm font-medium"
          >
            Read more <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <Link to={`/blog/${blog.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
        {blog.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="text-xs font-medium bg-cartus-primary/10 text-cartus-primary py-1 px-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="font-semibold text-xl mb-2 group-hover:text-cartus-primary transition-colors duration-300">
            {blog.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              {blog.author.avatar ? (
                <img 
                  src={blog.author.avatar} 
                  alt={blog.author.name} 
                  className="h-8 w-8 rounded-full mr-2"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-cartus-accent/20 flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-cartus-accent">
                    {blog.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-medium">{blog.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLike}
                className="flex items-center text-muted-foreground hover:text-cartus-primary transition-colors"
              >
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-xs">{blog.likes}</span>
              </button>
              
              <div className="flex items-center text-muted-foreground">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span className="text-xs">{blog.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
