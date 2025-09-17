import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Menu, X, ShoppingCart, User, Shield, Truck } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  cartItemsCount?: number;
  userRole?: 'customer' | 'admin' | 'courier' | null;
}

const Header = ({ cartItemsCount = 0, userRole }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'courier':
        return <Truck className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="p-2 bg-gradient-primary rounded-lg shadow-medical group-hover:shadow-elevated transition-smooth">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">MedRush</h1>
              <p className="text-xs text-muted-foreground">10-min delivery</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className={location.pathname === '/' ? 'bg-accent' : ''}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/shop')}
                className={location.pathname === '/shop' ? 'bg-accent' : ''}
              >
                Shop
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/track')}
                className={location.pathname === '/track' ? 'bg-accent' : ''}
              >
                Track Order
              </Button>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => navigate('/cart')}
              >
                <ShoppingCart className="w-4 h-4" />
                {cartItemsCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              {/* User Role & Profile */}
              {userRole ? (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="flex items-center space-x-2">
                    {getRoleIcon(userRole)}
                    <span className="capitalize">{userRole}</span>
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/profile')}>
                    Profile
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Login
                  </Button>
                  <Button variant="medical" onClick={() => navigate('/register')}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t mt-4 pt-4">
            <nav className="flex flex-col space-y-3">
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  navigate('/');
                  setIsMobileMenuOpen(false);
                }}
              >
                Home
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  navigate('/shop');
                  setIsMobileMenuOpen(false);
                }}
              >
                Shop
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => {
                  navigate('/track');
                  setIsMobileMenuOpen(false);
                }}
              >
                Track Order
              </Button>
              
              <div className="pt-4 border-t">
                {userRole ? (
                  <>
                    <div className="flex items-center space-x-2 mb-3 px-2">
                      {getRoleIcon(userRole)}
                      <span className="capitalize font-medium">{userRole}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="justify-start w-full"
                      onClick={() => {
                        navigate('/profile');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Profile
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      variant="medical" 
                      className="w-full"
                      onClick={() => {
                        navigate('/register');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;