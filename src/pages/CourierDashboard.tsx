import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Package, 
  CheckCircle,
  AlertCircle,
  Truck,
  User,
  Route,
  Star
} from "lucide-react";

// Mock data
const courierStats = [
  {
    title: "Today's Deliveries",
    value: "12",
    icon: <Package className="w-6 h-6" />,
    color: "text-primary"
  },
  {
    title: "Completed",
    value: "8",
    icon: <CheckCircle className="w-6 h-6" />,
    color: "text-success"
  },
  {
    title: "Pending",
    value: "4",
    icon: <AlertCircle className="w-6 h-6" />,
    color: "text-warning"
  },
  {
    title: "Rating",
    value: "4.9",
    icon: <Star className="w-6 h-6" />,
    color: "text-warning"
  }
];

const assignedOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    phone: "+91 98765 43210",
    product: "Digital Thermometer",
    address: "123 MG Road, Bangalore - 560001",
    distance: "2.4 km",
    estimatedTime: "6 mins",
    status: "pending",
    priority: "high"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    phone: "+91 98765 43211",
    product: "Blood Pressure Monitor",
    address: "456 Brigade Road, Bangalore - 560025",
    distance: "1.8 km",
    estimatedTime: "4 mins",
    status: "accepted",
    priority: "urgent"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    phone: "+91 98765 43212",
    product: "Pulse Oximeter",
    address: "789 Indiranagar, Bangalore - 560038",
    distance: "3.2 km",
    estimatedTime: "8 mins",
    status: "out_for_delivery",
    priority: "normal"
  }
];

const CourierDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "accepted":
        return <Badge variant="info">Accepted</Badge>;
      case "out_for_delivery":
        return <Badge variant="default">Out for Delivery</Badge>;
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge variant="warning">High</Badge>;
      case "normal":
        return <Badge variant="outline">Normal</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // This will be implemented with Supabase
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Courier Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your delivery routes and orders
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-destructive'}`}></div>
                <span className="text-sm font-medium">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <Button 
                variant={isOnline ? "destructive" : "success"}
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {courierStats.map((stat, index) => (
            <Card key={index} className="p-4 bg-gradient-card border-0 hover:shadow-elevated transition-smooth">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-2 bg-primary/10 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="route">Route Map</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="space-y-4">
              {assignedOrders.map((order) => (
                <Card key={order.id} className="p-6 bg-gradient-card border-0 hover:shadow-elevated transition-smooth">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-foreground">{order.id}</h3>
                          {getStatusBadge(order.status)}
                          {getPriorityBadge(order.priority)}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{order.customer}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{order.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{order.product}</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-start space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <span className="text-sm text-muted-foreground">{order.address}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Route className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{order.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{order.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:ml-6">
                      {order.status === "pending" && (
                        <>
                          <Button 
                            variant="success" 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "accepted")}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Accept
                          </Button>
                          <Button variant="destructive" size="sm">
                            Decline
                          </Button>
                        </>
                      )}
                      
                      {order.status === "accepted" && (
                        <Button 
                          variant="info" 
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "out_for_delivery")}
                        >
                          <Truck className="w-4 h-4 mr-2" />
                          Start Delivery
                        </Button>
                      )}
                      
                      {order.status === "out_for_delivery" && (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "delivered")}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Delivered
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-2" />
                        Navigate
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Route Map Tab */}
          <TabsContent value="route" className="space-y-6">
            <Card className="p-6 bg-gradient-card border-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Delivery Route Map</h3>
                <Button variant="medical">
                  <Navigation className="w-4 h-4 mr-2" />
                  Optimize Route
                </Button>
              </div>
              <div className="h-96 bg-accent/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive route map will be integrated here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing real-time delivery locations and optimized routes
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card border-0">
                <h3 className="text-lg font-semibold text-foreground mb-4">Courier Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-foreground">Alex Kumar</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-foreground">+91 98765 43213</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Vehicle Type</label>
                    <p className="text-foreground">Motorcycle</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">License Number</label>
                    <p className="text-foreground">DL-1ABC2345</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-0">
                <h3 className="text-lg font-semibold text-foreground mb-4">Performance Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Deliveries</span>
                    <span className="font-medium text-foreground">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-medium text-success">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Rating</span>
                    <span className="font-medium text-warning">4.9/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time Delivery</span>
                    <span className="font-medium text-success">96.2%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourierDashboard;