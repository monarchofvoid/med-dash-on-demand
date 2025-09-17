import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Clock, 
  Shield, 
  Truck, 
  Heart, 
  Stethoscope, 
  Activity,
  Users,
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "10-Minute Delivery",
      description: "Emergency medical equipment delivered to your doorstep in under 10 minutes"
    },
    {
      icon: <Shield className="w-8 h-8 text-success" />,
      title: "Certified Equipment",
      description: "All medical devices are certified and quality-tested for your safety"
    },
    {
      icon: <MapPin className="w-8 h-8 text-info" />,
      title: "Real-time Tracking",
      description: "Track your delivery in real-time with live courier location updates"
    },
    {
      icon: <Activity className="w-8 h-8 text-warning" />,
      title: "24/7 Availability",
      description: "Round-the-clock service for all your medical emergency needs"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "50+", label: "Medical Products" },
    { number: "15", label: "City Coverage" },
    { number: "99.8%", label: "On-time Delivery" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-background/80 backdrop-blur-sm">
              <Heart className="w-4 h-4 mr-2" />
              Emergency Medical Equipment Delivery
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Life-Saving Equipment
              <span className="block text-secondary">In 10 Minutes</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Get certified medical equipment delivered to your location in emergency situations. 
              Fast, reliable, and always available when you need it most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="text-lg"
                onClick={() => navigate('/shop')}
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg bg-background/20 border-background/30 text-primary-foreground hover:bg-background/30"
                onClick={() => navigate('/track')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Track Order
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose MedRush?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing emergency medical equipment delivery with cutting-edge technology and unwavering commitment to saving lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-elevated transition-smooth bg-gradient-card border-0">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Choose Your Portal
            </h2>
            <p className="text-xl text-muted-foreground">
              Access the platform that's designed for your role
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Customer Portal */}
            <Card className="p-8 text-center hover:shadow-elevated transition-smooth bg-gradient-card border-0 group cursor-pointer" onClick={() => navigate('/shop')}>
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-smooth">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Customer Portal</h3>
              <p className="text-muted-foreground mb-6">
                Browse and order medical equipment for immediate delivery
              </p>
              <Button variant="medical" className="w-full">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Admin Portal */}
            <Card className="p-8 text-center hover:shadow-elevated transition-smooth bg-gradient-card border-0 group cursor-pointer" onClick={() => navigate('/admin')}>
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-info/10 rounded-full group-hover:bg-info/20 transition-smooth">
                  <Shield className="w-8 h-8 text-info" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Admin Portal</h3>
              <p className="text-muted-foreground mb-6">
                Manage inventory, orders, and oversee platform operations
              </p>
              <Button variant="info" className="w-full">
                Admin Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Courier Portal */}
            <Card className="p-8 text-center hover:shadow-elevated transition-smooth bg-gradient-card border-0 group cursor-pointer" onClick={() => navigate('/courier')}>
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-smooth">
                  <Truck className="w-8 h-8 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Courier Portal</h3>
              <p className="text-muted-foreground mb-6">
                Accept deliveries and manage your delivery routes
              </p>
              <Button variant="secondary" className="w-full">
                Start Delivering
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who trust MedRush for their emergency medical equipment needs.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-lg"
            onClick={() => navigate('/register')}
          >
            Create Account
            <Star className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;