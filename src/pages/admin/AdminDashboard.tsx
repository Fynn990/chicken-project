
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ThumbsUp, FileText, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { useBlog } from '../../contexts/BlogContext';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { blogs } = useBlog();
  
  const cards = [
    {
      title: 'Products',
      value: products.length,
      description: 'Total products in inventory',
      icon: <Package className="h-5 w-5 text-cartus-primary" />,
      link: '/admin/products',
    },
    {
      title: 'Reviews',
      value: '48',
      description: '12 pending review',
      icon: <ThumbsUp className="h-5 w-5 text-cartus-primary" />,
      link: '/admin/reviews',
    },
    {
      title: 'Blog Posts',
      value: blogs.length,
      description: '2 pending approval',
      icon: <FileText className="h-5 w-5 text-cartus-primary" />,
      link: '/admin/blogs',
    },
    {
      title: 'Active Users',
      value: '124',
      description: '32 new this month',
      icon: <Users className="h-5 w-5 text-cartus-primary" />,
      link: '/admin/stats',
    },
  ];
  
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Link to={card.link} key={index}>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="text-sm">
                  <span className="font-medium">New order</span> - Order #12345 received
                  <div className="text-xs text-muted-foreground">3 minutes ago</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div className="text-sm">
                  <span className="font-medium">New user</span> - John Doe registered
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                <div className="text-sm">
                  <span className="font-medium">New review</span> - Chicken Breasts (4.5 stars)
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <div className="text-sm">
                  <span className="font-medium">New blog post</span> - "Sustainable Chicken Farming"
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link to="/admin/products">
              <Button className="w-full justify-start bg-cartus-primary hover:bg-cartus-primary/90">
                <Package className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link to="/admin/blogs">
              <Button className="w-full justify-start bg-cartus-primary hover:bg-cartus-primary/90">
                <FileText className="mr-2 h-4 w-4" />
                Create Blog Post
              </Button>
            </Link>
            <Link to="/admin/reviews">
              <Button className="w-full justify-start bg-cartus-primary hover:bg-cartus-primary/90">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Moderate Reviews
              </Button>
            </Link>
            <Link to="/admin/chat">
              <Button className="w-full justify-start bg-cartus-primary hover:bg-cartus-primary/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                View Messages
                {/* Show badge if there are unread messages */}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
