
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { useMobileNavigation } from "@/hooks/useMobileNavigation";
import { MobileNavigation } from "@/components/ui/MobileNavigation";

const Contact = () => {
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
      <div className="min-h-screen bg-white">
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
                <Link 
                  to="/#how-it-works"
                  className="text-portal-dark hover:text-portal-sage transition-colors cursor-pointer"
                >
                  How We Work
                </Link>
                <Link to="/shop" className="text-portal-dark hover:text-portal-sage transition-colors">
                  Shop
                </Link>
                <Link to="/start-project" className="text-portal-dark hover:text-portal-sage transition-colors">
                  Start a Project
                </Link>
                <Link to="/contact" className="text-portal-sage font-medium">
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <h1 className="text-4xl lg:text-5xl font-light text-portal-dark leading-tight mb-6 font-cinzel">
                  CONTACT US
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Ready to transform your space? We'd love to hear from you! Whether you have a specific vision in mind or need guidance on where to start, our team of expert designers is here to help bring your dream space to life.
                </p>
                
                {/* Start Project Button */}
                <div className="text-center mb-8">
                  <Link to="/start-project">
                    <Button className="bg-portal-sage hover:bg-portal-sage/90 text-white px-8 py-3 text-lg">
                      Start Your Project
                    </Button>
                  </Link>
                </div>

                {/* Or Login to get started */}
                <div className="text-center mb-8">
                  <p className="text-gray-600 mb-4">Already have an account?</p>
                  <Link to="/login">
                    <Button variant="outline" className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white px-8 py-3 text-lg">
                      Log In to Dashboard
                    </Button>
                  </Link>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-portal-dark mb-4 font-cinzel">Get in Touch</h3>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-portal-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-portal-sage" />
                    </div>
                    <div>
                      <h4 className="font-medium text-portal-dark mb-1">Email</h4>
                      <p className="text-gray-600">hello@portaldesign.com</p>
                      <p className="text-gray-600">support@portaldesign.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-portal-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-portal-sage" />
                    </div>
                    <div>
                      <h4 className="font-medium text-portal-dark mb-1">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-portal-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-portal-sage" />
                    </div>
                    <div>
                      <h4 className="font-medium text-portal-dark mb-1">Office</h4>
                      <p className="text-gray-600">
                        123 Design Avenue<br />
                        Suite 456<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-portal-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-portal-sage" />
                    </div>
                    <div>
                      <h4 className="font-medium text-portal-dark mb-1">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: By appointment only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
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
          className="text-2xl font-medium text-portal-dark hover:text-portal-sage transition-colors"
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
          className="text-2xl font-medium text-portal-sage transition-colors"
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

export default Contact;
