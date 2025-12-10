
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import { MobileNavigation } from "@/components/ui/MobileNavigation";

const Shop = () => {
  const { user } = useAuth();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileNavigation();

  const scrollToHowItWorks = () => {
    window.location.href = '/#how-it-works';
  };

  const handleMobileHowItWorks = () => {
    closeMobileMenu();
    scrollToHowItWorks();
  };

  return (
    <>
      <div className="min-h-screen bg-portal-beige">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/561a35d9-ac29-4804-b76e-c08fc3f916c3.png" 
                  alt="Portal by CreoDesigns" 
                  className="h-12 w-auto"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link to="/#how-it-works" className="text-portal-dark hover:text-portal-sage transition-colors">
                  How We Work
                </Link>
                <Link to="/shop" className="text-portal-sage font-medium">
                  Shop
                </Link>
                <Link to="/start-project" className="text-portal-dark hover:text-portal-sage transition-colors">
                  Start a Project
                </Link>
                <Link to="/contact" className="text-portal-dark hover:text-portal-sage transition-colors">
                  Contact Us
                </Link>
                {user ? (
                  <Link to="/dashboard" className="text-portal-dark hover:text-portal-sage transition-colors">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/login" className="text-portal-dark hover:text-portal-sage transition-colors">
                    Log In
                  </Link>
                )}
              </nav>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-portal-dark hover:text-portal-sage transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-portal-sage/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-portal-sage" />
            </div>
            <h1 
              className="text-4xl lg:text-6xl font-bold text-portal-dark mb-6 font-cinzel leading-tight overflow-visible py-2"
              style={{
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              Shop
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-portal-dark mb-4 font-cinzel">Coming Soon...</h2>
              <p className="text-xl text-gray-600 mb-8">
                We're working on bringing you an amazing collection of design products and home decor items. Stay tuned!
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
                <Link to="/start-project" className="mb-6 sm:mb-0">
                  <Button className="bg-portal-sage hover:bg-portal-sage/90 text-white px-8 py-3 text-lg w-full sm:w-auto">
                    Start a Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white px-8 py-3 text-lg w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
        <button 
          onClick={handleMobileHowItWorks} 
          className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors text-left"
        >
          How We Work
        </button>
        <Link 
          to="/shop" 
          onClick={closeMobileMenu}
          className="text-2xl font-medium text-portal-sage transition-colors"
        >
          Shop
        </Link>
        <Link 
          to="/start-project" 
          onClick={closeMobileMenu}
          className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors"
        >
          Start a Project
        </Link>
        <Link 
          to="/contact" 
          onClick={closeMobileMenu}
          className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors"
        >
          Contact Us
        </Link>
        {user ? (
          <Link 
            to="/dashboard" 
            onClick={closeMobileMenu}
            className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors"
          >
            Dashboard
          </Link>
        ) : (
          <Link 
            to="/login" 
            onClick={closeMobileMenu}
            className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors"
          >
            Log In
          </Link>
        )}
      </MobileNavigation>
    </>
  );
};

export default Shop;
