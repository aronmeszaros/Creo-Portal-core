
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import { MobileNavigation } from "@/components/ui/MobileNavigation";

export const ProjectFormHeader = () => {
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
              <button 
                onClick={scrollToHowItWorks}
                className="text-portal-dark hover:text-portal-sage transition-colors cursor-pointer"
              >
                How We Work
              </button>
              <Link to="/shop" className="text-portal-dark hover:text-portal-sage transition-colors">
                Shop
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
          className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors"
        >
          Shop
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
