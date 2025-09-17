import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Truck, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Search,
  BarChart3,
  MapPin
} from "lucide-react";

// Mock data
const dashboardStats = [
  {
    title: "Total Orders",
    value: "1,234",
    change: "+12%",
    icon: <ShoppingCart className="w-6 h-6" />,
    trend: "up"
  },
  {
    title: "Active Deliveries",
    value: "45",
    change: "+5%",
    icon: <Truck className="w-6 h-6" />,
    trend: "up"
  },
  {
    title: "Total Products",
    value: "156",
    change: "+8%",
    icon: <Package className="w-6 h-6" />,
    trend: "up"
  },
  {
    title: "Revenue Today",
    value: "₹45,230",
    change: "+18%",
    icon: <TrendingUp className="w-6 h-6" />,
    trend: "up"
  }
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "Digital Thermometer",
    amount: "₹299",
    status: "delivered",
    time: "2 mins ago"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Blood Pressure Monitor",
    amount: "₹1,299",
    status: "out_for_delivery",
    time: "5 mins ago"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "Pulse Oximeter",
    amount: "₹899",
    status: "pending",
    time: "8 mins ago"
  }
];

const products = [
  {
    id: 1,
    name: "Digital Thermometer",
    category: "Diagnostics",
    price: "₹299",
    stock: 25,
    status: "active"
  },
  {
    id: 2,
    name: "Blood Pressure Monitor",
    category: "Diagnostics",
    price: "₹1,299",
    stock: 15,
    status: "active"
  },
  {
    id: 3,
    name: "Pulse Oximeter",
    category: "Monitoring",
    price: "₹899",
    stock: 5,
    status: "low_stock"
  }
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "out_for_delivery":
        return <Badge variant="info">Out for Delivery</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 5) return <Badge variant="destructive">Low Stock</Badge>;
    if (stock <= 15) return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="success">In Stock</Badge>;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your medical equipment delivery platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="p-6 bg-gradient-card border-0 hover:shadow-elevated transition-smooth">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                    {stat.change} from yesterday
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="p-6 bg-gradient-card border-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer} • {order.product}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{order.amount}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Low Stock Alerts */}
              <Card className="p-6 bg-gradient-card border-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Stock Alerts</h3>
                  <AlertCircle className="w-5 h-5 text-warning" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div>
                      <p className="font-medium text-foreground">Pulse Oximeter</p>
                      <p className="text-sm text-muted-foreground">Only 5 units left</p>
                    </div>
                    <Badge variant="destructive">Low Stock</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div>
                      <p className="font-medium text-foreground">ECG Monitor</p>
                      <p className="text-sm text-muted-foreground">Only 3 units left</p>
                    </div>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Filter</Button>
                  <Button variant="outline">Export</Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{order.product}</p>
                        <p className="text-sm text-muted-foreground">{order.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-foreground">{order.amount}</span>
                      {getStatusBadge(order.status)}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10"
                  />
                </div>
                <Button variant="medical">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-foreground">{product.price}</span>
                      <div className="text-right">
                        <p className="text-sm text-foreground">{product.stock} units</p>
                        {getStockStatus(product.stock)}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card border-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Revenue Analytics</h3>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization will be here</p>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Delivery Heatmap</h3>
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map visualization will be here</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;