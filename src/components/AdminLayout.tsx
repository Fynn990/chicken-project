
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ThumbsUp, 
  FileText, 
  BarChart, 
  MessageCircle, 
  LogOut, 
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { useChat } from '../contexts/ChatContext';
import { Badge } from './ui/badge';
import Navbar from './Navbar';
import Footer from './Footer';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { getUnreadMessagesCount } = useChat();
  
  const unreadCount = getUnreadMessagesCount();
  
  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/products', label: 'Products', icon: <Package size={20} /> },
    { path: '/admin/reviews', label: 'Reviews', icon: <ThumbsUp size={20} /> },
    { path: '/admin/blogs', label: 'Blogs', icon: <FileText size={20} /> },
    { path: '/admin/stats', label: 'Statistics', icon: <BarChart size={20} /> },
    { 
      path: '/admin/chat', 
      label: 'Chat', 
      icon: <MessageCircle size={20} />,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen fixed left-0 top-0 pt-24 z-10">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6 p-2 bg-cartus-neutral/10 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-cartus-primary flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-cartus-primary text-white'
                      : 'text-gray-700 hover:bg-cartus-neutral/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge className="bg-red-500">{item.badge}</Badge>
                  )}
                </Link>
              ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut size={20} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">{title}</h1>
            {children}
          </div>
        </main>
      </div>
      
      <div className="ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
