
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Star, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const MOCK_REVIEWS = [
  {
    id: 'r1',
    userId: 'u1',
    productId: 'p1',
    userName: 'John Smith',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4,
    comment: 'The whole chicken was fresh and delicious. Definitely will buy again!',
    createdAt: '2023-05-15T10:30:00Z',
    status: 'pending',
    productName: 'Whole Free-Range Chicken',
  },
  {
    id: 'r2',
    userId: 'u2',
    productId: 'p2',
    userName: 'Emma Johnson',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 5,
    comment: 'These chicken breasts are the best I\'ve ever had. So tender and flavorful!',
    createdAt: '2023-05-14T14:20:00Z',
    status: 'pending',
    productName: 'Chicken Breast Fillets',
  },
  {
    id: 'r3',
    userId: 'u3',
    productId: 'p3',
    userName: 'Michael Brown',
    userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 2,
    comment: 'The thighs were smaller than expected and a bit dry.',
    createdAt: '2023-05-13T09:45:00Z',
    status: 'pending',
    productName: 'Chicken Thighs',
  },
  {
    id: 'r4',
    userId: 'u4',
    productId: 'p4',
    userName: 'Sophia Davis',
    userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 5,
    comment: 'Perfect wings for our BBQ! Everyone loved them.',
    createdAt: '2023-05-12T18:15:00Z',
    status: 'approved',
    productName: 'Chicken Wings',
  },
  {
    id: 'r5',
    userId: 'u5',
    productId: 'p5',
    userName: 'Olivia Wilson',
    userAvatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    rating: 4,
    comment: 'Good drumsticks, but packaging could be improved.',
    createdAt: '2023-05-11T12:10:00Z',
    status: 'approved',
    productName: 'Chicken Drumsticks',
  },
  {
    id: 'r6',
    userId: 'u6',
    productId: 'p6',
    userName: 'William Taylor',
    userAvatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    rating: 1,
    comment: 'Not fresh at all. Very disappointed with the quality.',
    createdAt: '2023-05-10T15:30:00Z',
    status: 'rejected',
    productName: 'Organic Chicken Liver',
  },
];

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleApproveReview = (reviewId: string) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId ? { ...review, status: 'approved' } : review
      )
    );
    
    toast({
      title: 'Review approved',
      description: 'The review is now visible to all users.',
    });
  };
  
  const handleRejectReview = (reviewId: string) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId ? { ...review, status: 'rejected' } : review
      )
    );
    
    toast({
      title: 'Review rejected',
      description: 'The review has been rejected and won\'t be displayed.',
      variant: 'destructive',
    });
  };
  
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return review.status === activeTab && matchesSearch;
  });
  
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ));
  };
  
  const getStatusCount = (status: string) => {
    return reviews.filter(review => review.status === status).length;
  };
  
  return (
    <AdminLayout title="Manage Reviews">
      <Tabs defaultValue="pending" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({getStatusCount('pending')})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({getStatusCount('approved')})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({getStatusCount('rejected')})
            </TabsTrigger>
            <TabsTrigger value="all">All Reviews</TabsTrigger>
          </TabsList>
          
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reviews..."
              className="pl-10"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="pending" className="mt-0">
          {renderReviewList('pending')}
        </TabsContent>
        <TabsContent value="approved" className="mt-0">
          {renderReviewList('approved')}
        </TabsContent>
        <TabsContent value="rejected" className="mt-0">
          {renderReviewList('rejected')}
        </TabsContent>
        <TabsContent value="all" className="mt-0">
          {renderReviewList('all')}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
  
  function renderReviewList(status: string) {
    if (filteredReviews.length === 0) {
      return (
        <div className="text-center py-8 bg-white rounded-md shadow">
          <p className="text-muted-foreground">No reviews found.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{review.userName}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Product: {review.productName}
                  </p>
                  <p className="mt-2">{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {review.status === 'pending' ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-50"
                      onClick={() => handleApproveReview(review.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleRejectReview(review.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      review.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {review.status === 'approved' ? 'Approved' : 'Rejected'}
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default AdminReviews;
