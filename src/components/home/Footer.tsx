
import { Link } from "react-router-dom";

interface FooterProps {
  scrollToHowItWorks: () => void;
}

export const Footer = ({ scrollToHowItWorks }: FooterProps) => {
  return (
    <footer className="py-20 pb-6 bg-portal-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/561a35d9-ac29-4804-b76e-c08fc3f916c3.png" 
                alt="Portal by CreoDesigns" 
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><button onClick={scrollToHowItWorks} className="text-white/80 hover:text-white transition-colors">How We Work</button></li>
              <li><Link to="/shop" className="text-white/80 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/start-project" className="text-white/80 hover:text-white transition-colors">Start a Project</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-white/80">Single Design Consultation</li>
              <li className="text-white/80">Full Design Concept</li>
              <li className="text-white/80">Design & Procurement</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2 text-white/80">
              <p>Portal by Creo Designs</p>
              <p>+421 912 345 678</p>
              <p>portal@creodesigns.com</p>
              <p>Adress 123, 901 20 UK</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 Portal by Creo Designs. All Rights Reserved | GDPR | <Link to="/cookies" className="text-white/60 hover:text-white transition-colors">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
