
import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Blog, User } from '../types';

interface BlogContextType {
  blogs: Blog[];
  addBlog: (title: string, content: string, excerpt: string, tags: string[], imageUrl?: string) => Promise<boolean>;
  likeBlog: (blogId: string) => void;
  addComment: (blogId: string, content: string) => Promise<boolean>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

interface BlogProviderProps {
  children: ReactNode;
}

// Sample user for demo blogs
const demoAuthor: User = {
  id: '3',
  name: 'Maria Johnson',
  email: 'maria@example.com',
  role: 'user',
  avatar: 'https://i.pravatar.cc/150?img=5',
};

// Sample blogs data
const initialBlogs: Blog[] = [
  {
    id: '1',
    title: 'Raising Free-Range Chickens: A Complete Guide',
    content: `<p>When it comes to raising chickens, free-range farming is becoming increasingly popular among small-scale farmers and homesteaders. Not only does it improve the quality of life for the chickens, but it also results in healthier, more flavorful meat.</p>
    <p>At Cartus Agri, our chickens roam freely on open pastures where they can forage for insects, seeds, and plants. This natural diet, combined with the exercise they get from roaming, contributes to leaner meat with better texture and flavor.</p>
    <p>Free-range farming isn't without its challenges, though. Predators can be a significant concern, and you'll need to implement proper protection measures. We use a combination of guardian animals, secure night housing, and strategic fencing to keep our flock safe while still allowing them the freedom to roam.</p>
    <p>Another key aspect of successful free-range chicken farming is land management. Rotating your chickens to different pastures helps prevent overgrazing and allows the land to recover. It also reduces the buildup of parasites in the soil, which can be a problem in stationary free-range setups.</p>
    <p>If you're considering making the switch to free-range, start small and expand gradually as you learn what works best for your specific situation. The reward is well worth it – healthier, happier chickens and superior quality meat that your customers will notice and appreciate.</p>`,
    excerpt: 'Learn how raising free-range chickens leads to healthier birds and better quality meat, with practical tips from our farm.',
    author: demoAuthor,
    createdAt: '2023-10-15T09:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    tags: ['free-range', 'farming', 'chicken care', 'sustainability'],
    likes: 24,
    comments: [
      {
        id: '101',
        content: 'Great insights! I've been considering free-range for my small backyard flock. Do you have any tips for predator protection in a smaller space?',
        author: {
          id: '4',
          name: 'Thomas Wright',
          email: 'thomas@example.com',
          role: 'user',
        },
        createdAt: '2023-10-16T14:20:00Z',
      }
    ]
  },
  {
    id: '2',
    title: 'The Benefits of Organic Chicken Feed',
    content: `<p>Switching to organic feed is one of the best decisions we've made at Cartus Agri. The difference in our chickens' health, growth rate, and the quality of their meat has been remarkable.</p>
    <p>Organic chicken feed typically contains a blend of grains, seeds, and plant proteins that are grown without synthetic pesticides, herbicides, or genetically modified ingredients. This cleaner food chain means fewer toxins accumulate in the chickens' bodies and, by extension, in the meat you eat.</p>
    <p>One of the most noticeable benefits is improved immune function in the flock. Our chickens get sick less often, which means we don't need to use antibiotics – supporting our commitment to raising antibiotic-free poultry.</p>
    <p>Though organic feed costs more upfront, we've found that the chickens convert it more efficiently into meat, partly offsetting the higher cost. Plus, the premium customers are willing to pay for organic, high-quality chicken makes it a financially sound choice in the long run.</p>
    <p>If you're considering transitioning to organic feed, we recommend doing it gradually over a few weeks to allow the chickens' digestive systems to adjust. Also, look for local sources to reduce the environmental impact and potentially save on shipping costs.</p>`,
    excerpt: 'Discover why we chose organic feed for our chickens and the many benefits we've observed in their health and the quality of their meat.',
    author: {
      id: '5',
      name: 'Robert Chen',
      email: 'robert@cartusagri.com',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    createdAt: '2023-11-03T11:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1569096651661-820d0de8b4ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['organic', 'nutrition', 'sustainability', 'chicken health'],
    likes: 16,
    comments: []
  },
  {
    id: '3',
    title: 'Seasonal Recipes: Making the Most of Your Chicken',
    content: `<p>As the seasons change, so do the fresh ingredients available to complement your chicken dishes. At Cartus Agri, we believe in making the most of seasonal produce to create meals that are not only delicious but also sustainable and nutritionally balanced.</p>
    <p>Spring brings tender vegetables like asparagus, peas, and early herbs that pair beautifully with lighter chicken preparations. Try a simple roast chicken with lemon and fresh herbs, served alongside steamed asparagus and new potatoes.</p>
    <p>Summer is perfect for grilling! Marinate chicken pieces in olive oil, garlic, and fresh herbs before grilling, and serve with a colorful salad of tomatoes, cucumbers, and bell peppers from your garden or local farmers' market.</p>
    <p>As autumn arrives, heartier preparations come into play. Slow-cooked chicken stews with root vegetables, mushrooms, and a touch of warming spices like cinnamon and cloves make comforting meals for cooler evenings.</p>
    <p>Winter calls for rich, warming dishes. A classic coq au vin or chicken pot pie celebrates the season perfectly. Don't forget to save the bones for making nourishing bone broth – a traditional remedy for winter colds and a flavorful base for soups and stews.</p>
    <p>By following the rhythm of the seasons, you'll not only enjoy your chicken at its best but also support local agriculture and reduce the environmental impact of your food choices.</p>`,
    excerpt: 'Explore how to adapt your chicken recipes to each season, making the most of local, seasonal ingredients for delicious and sustainable meals.',
    author: demoAuthor,
    createdAt: '2023-12-07T15:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    tags: ['recipes', 'seasonal cooking', 'farm to table', 'sustainability'],
    likes: 31,
    comments: [
      {
        id: '102',
        content: 'I tried the autumn chicken stew recipe and it was amazing! The whole family loved it.',
        author: {
          id: '6',
          name: 'Sarah Miller',
          email: 'sarah@example.com',
          role: 'user',
        },
        createdAt: '2023-12-10T09:15:00Z',
      },
      {
        id: '103',
        content: 'Do you have any recommendations for using chicken in cold summer dishes? It's too hot to cook where I live!',
        author: {
          id: '7',
          name: 'Jason Patel',
          email: 'jason@example.com',
          role: 'user',
        },
        createdAt: '2023-12-12T11:30:00Z',
      }
    ]
  }
];

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);

  const addBlog = async (title: string, content: string, excerpt: string, tags: string[], imageUrl?: string) => {
    try {
      // In a real app, you'd call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get current user from auth context
      // For simplicity, we're using a fake user here
      const currentUser: User = {
        id: '2',
        name: 'John Doe',
        email: 'user@example.com',
        role: 'user',
      };
      
      const newBlog: Blog = {
        id: `blog-${Date.now()}`,
        title,
        content,
        excerpt,
        author: currentUser,
        createdAt: new Date().toISOString(),
        imageUrl,
        tags,
        likes: 0,
        comments: [],
      };
      
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
      
      toast({
        title: 'Blog posted successfully!',
        description: 'Your blog has been published.',
      });
      
      return true;
    } catch (error) {
      console.error('Error adding blog:', error);
      
      toast({
        title: 'Failed to post blog',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    }
  };

  const likeBlog = (blogId: string) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === blogId 
          ? { ...blog, likes: blog.likes + 1 } 
          : blog
      )
    );
  };

  const addComment = async (blogId: string, content: string) => {
    try {
      // In a real app, you'd call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 300));

      // Get current user from auth context
      // For simplicity, we're using a fake user here
      const currentUser: User = {
        id: '2',
        name: 'John Doe',
        email: 'user@example.com',
        role: 'user',
      };
      
      const newComment = {
        id: `comment-${Date.now()}`,
        content,
        author: currentUser,
        createdAt: new Date().toISOString(),
      };
      
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog.id === blogId 
            ? { 
                ...blog, 
                comments: [...blog.comments, newComment] 
              } 
            : blog
        )
      );
      
      toast({
        title: 'Comment added',
        description: 'Your comment has been posted.',
      });
      
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      
      toast({
        title: 'Failed to add comment',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      
      return false;
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        likeBlog,
        addComment,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
