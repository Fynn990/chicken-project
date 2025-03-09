
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart as BarChartIcon,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for demonstration
const salesData = [
  { name: 'Jan', sales: 3200 },
  { name: 'Feb', sales: 4100 },
  { name: 'Mar', sales: 3800 },
  { name: 'Apr', sales: 4900 },
  { name: 'May', sales: 5200 },
  { name: 'Jun', sales: 4800 },
  { name: 'Jul', sales: 6300 },
  { name: 'Aug', sales: 7400 },
  { name: 'Sep', sales: 6800 },
  { name: 'Oct', sales: 7900 },
  { name: 'Nov', sales: 8200 },
  { name: 'Dec', sales: 9400 },
];

const categoryData = [
  { name: 'Whole Chicken', value: 34 },
  { name: 'Chicken Parts', value: 45 },
  { name: 'Organs', value: 8 },
  { name: 'Processed', value: 13 },
];

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE'];

const trafficData = [
  { name: 'Mon', direct: 320, search: 240, social: 180 },
  { name: 'Tue', direct: 302, search: 290, social: 190 },
  { name: 'Wed', direct: 341, search: 350, social: 210 },
  { name: 'Thu', direct: 374, search: 420, social: 220 },
  { name: 'Fri', direct: 390, search: 460, social: 290 },
  { name: 'Sat', direct: 450, search: 480, social: 380 },
  { name: 'Sun', direct: 420, search: 460, social: 340 },
];

const AdminStats = () => {
  const { products } = useProducts();
  
  // Calculate total inventory value
  const totalInventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );
  
  // Get top selling products
  const topSellingProducts = [...products]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);
  
  return (
    <AdminLayout title="Statistics">
      {/* Summary cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-cartus-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,568.00</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-cartus-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">583</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +8.4% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-5 w-5 text-cartus-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,843</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              +12.7% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-5 w-5 text-cartus-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInventoryValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
              -2.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
            <CardDescription>Total sales throughout the year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#ff6b35" name="Sales ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
            <CardDescription>Traffic sources over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="direct" stroke="#f9c74f" name="Direct" />
                  <Line type="monotone" dataKey="search" stroke="#90be6d" name="Search" />
                  <Line type="monotone" dataKey="social" stroke="#5e60ce" name="Social" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Products with the highest sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingProducts.map((product, index) => (
                <div key={product.id} className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-cartus-primary/10 text-cartus-primary rounded-full mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.sold} units sold</div>
                  </div>
                  <div className="font-medium">${product.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStats;
