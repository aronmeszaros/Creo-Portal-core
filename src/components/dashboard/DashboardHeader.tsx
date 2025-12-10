
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Plus, Shield, Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import { MobileNavigation } from "@/components/ui/MobileNavigation";

export const DashboardHeader = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileNavigation();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleMobileLogout = async () => {
    closeMobileMenu();
    await handleLogout();
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
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/start-project">
                <Button variant="outline" size="sm" className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white font-medium tracking-wider uppercase">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
              <div className="flex items-center space-x-2 text-portal-dark/70">
                <User className="w-4 h-4" />
                <span>{user?.email}</span>
                {isAdmin && (
                  <Badge variant="secondary" className="bg-portal-sage/20 text-portal-sage border-portal-sage/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-portal-dark hover:text-portal-sage">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
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
        <Link 
          to="/start-project" 
          onClick={closeMobileMenu}
          className="text-2xl font-medium text-portal-sage transition-colors flex items-center"
        >
          <Plus className="w-6 h-6 mr-3" />
          New Project
        </Link>
        
        <div className="border-t border-gray-200 pt-8 mt-8 w-full">
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-5 h-5 text-portal-dark/70" />
            <span className="text-lg text-portal-dark/70">{user?.email}</span>
            {isAdmin && (
              <Badge variant="secondary" className="bg-portal-sage/20 text-portal-sage border-portal-sage/30">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
          </div>
          <button 
            onClick={handleMobileLogout}
            className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors flex items-center"
          >
            <LogOut className="w-6 h-6 mr-3" />
            Logout
          </button>
        </div>
      </MobileNavigation>
    </>
  );
};
