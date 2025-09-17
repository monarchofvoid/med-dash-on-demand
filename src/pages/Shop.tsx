import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  Heart,
  Clock,
  Package
} from "lucide-react";

// Mock product data - will be replaced with Supabase data
const mockProducts = [
  {
    id: 1,
    name: "Digital Thermometer",
    description: "High-precision digital thermometer with instant readings",
    price: 299,
    originalPrice: 399,
    image: "/api/placeholder/300/300",
    category: "Diagnostics",
    rating: 4.8,
    reviews: 142,
    stock: 25,
    deliveryTime: "8 mins"
  },
  {
    id: 2,
    name: "Blood Pressure Monitor",
    description: "Automatic blood pressure monitor with large display",
    price: 1299,
    originalPrice: 1599,
    image: "/api/placeholder/300/300",
    category: "Diagnostics",
    rating: 4.9,
    reviews: 89,
    stock: 15,
    deliveryTime: "6 mins"
  },
  {
    id: 3,
    name: "Pulse Oximeter",
    description: "Fingertip pulse oximeter with OLED display",
    price: 899,
    originalPrice: 1199,
    image: "/api/placeholder/300/300",
    category: "Monitoring",
    rating: 4.7,
    reviews: 203,
    stock: 30,
    deliveryTime: "5 mins"
  },
  {
    id: 4,
    name: "First Aid Kit",
    description: "Complete first aid kit for emergency situations",
    price: 599,
    originalPrice: 799,
    image: "/api/placeholder/300/300",
    category: "Emergency",
    rating: 4.6,
    reviews: 156,
    stock: 40,
    deliveryTime: "7 mins"
  },
  {
    id: 5,
    name: "Nebulizer Machine",
    description: "Portable nebulizer for respiratory treatments",
    price: 2499,
    originalPrice: 2999,
    image: "/api/placeholder/300/300",
    category: "Respiratory",
    rating: 4.8,
    reviews: 67,
    stock: 8,
    deliveryTime: "10 mins"
  },
  {
    id: 6,
    name: "ECG Monitor",
    description: "Portable ECG monitor with smartphone connectivity",
    price: 4999,
    originalPrice: 5999,
    image: "/api/placeholder/300/300",
    category: "Cardiology",
    rating: 4.9,
    reviews: 34,
    stock: 5,
    deliveryTime: "9 mins"
  }
];

const categories = ["All", "Diagnostics", "Monitoring", "Emergency", "Respiratory", "Cardiology"];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState<number[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
  };

  const isInCart = (productId: number) => cartItems.includes(productId);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Medical Equipment Store
          </h1>
          <p className="text-muted-foreground">
            Browse our certified medical equipment with 10-minute delivery guarantee
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search medical equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-elevated transition-smooth bg-gradient-card border-0 group">
              {/* Product Image */}
              <div className="relative aspect-square bg-accent/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  <Badge variant="success" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {product.deliveryTime}
                  </Badge>
                  {product.originalPrice > product.price && (
                    <Badge variant="destructive" className="text-xs">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant={isInCart(product.id) ? "success" : "medical"}
                  className="w-full"
                  onClick={() => addToCart(product.id)}
                  disabled={isInCart(product.id)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;