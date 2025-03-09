
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useBlog } from '../../contexts/BlogContext';
import NewBlogModal from '../../components/NewBlogModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Blog } from '../../types';
import { Input } from '@/components/ui/input';

const AdminBlogs = () => {
  const { blogs, deleteBlog } = useBlog();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleApprove = (blog: Blog) => {
    // In a real app, this would update the blog status in the backend
    toast({
      title: 'Blog approved',
      description: 'The blog post is now published and visible to all users.',
    });
  };
  
  const handleReject = (blog: Blog) => {
    // In a real app, this would update the blog status in the backend
    toast({
      title: 'Blog rejected',
      description: 'The blog post has been rejected and won\'t be published.',
      variant: 'destructive',
    });
  };
  
  const handleDelete = (blog: Blog) => {
    deleteBlog(blog.id);
    toast({
      title: 'Blog deleted',
      description: 'The blog post has been permanently deleted.',
      variant: 'destructive',
    });
  };
  
  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
  };
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });
  
  return (
    <AdminLayout title="Manage Blog Posts">
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="all" onValueChange={(value) => setViewMode(value as any)}>
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Pending Approval</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search blogs..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-cartus-primary hover:bg-cartus-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Blog Post
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map(blog => (
          <Card key={blog.id} className="flex flex-col">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={blog.imageUrl || 'https://via.placeholder.com/800x500?text=Cartus+Agri+Blog'}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardContent className="flex-1 p-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {blog.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="line-clamp-3 text-sm">{blog.excerpt}</p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex flex-wrap justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleViewBlog(blog)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-green-500 text-green-500 hover:bg-green-50"
                  onClick={() => handleApprove(blog)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => handleReject(blog)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(blog)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-md shadow mt-4">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      )}
      
      {/* New Blog Modal */}
      <NewBlogModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      
      {/* View Blog Dialog */}
      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedBlog && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBlog.title}</DialogTitle>
              </DialogHeader>
              
              {selectedBlog.imageUrl && (
                <img
                  src={selectedBlog.imageUrl}
                  alt={selectedBlog.title}
                  className="w-full h-64 object-cover rounded-md my-4"
                />
              )}
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                By {selectedBlog.author.name} • 
                {new Date(selectedBlog.createdAt).toLocaleDateString()}
              </p>
              
              <div className="prose prose-sm max-w-none">
                {selectedBlog.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{selectedBlog.likes} likes</span>
                  <span>•</span>
                  <span>{selectedBlog.comments.length} comments</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-green-500 text-green-500 hover:bg-green-50"
                    onClick={() => {
                      handleApprove(selectedBlog);
                      setSelectedBlog(null);
                    }}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    onClick={() => {
                      handleReject(selectedBlog);
                      setSelectedBlog(null);
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBlogs;
