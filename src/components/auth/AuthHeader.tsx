
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AuthHeaderProps {
  showSignInButton?: boolean;
  showSignUpButton?: boolean;
}

export const AuthHeader = ({ showSignInButton = true, showSignUpButton = false }: AuthHeaderProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/561a35d9-ac29-4804-b76e-c08fc3f916c3.png" 
              alt="Portal by CreoDesigns" 
              className="h-8 w-auto"
            />
          </Link>
          <div className="space-x-2">
            {showSignInButton && (
              <Link to="/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}
            {showSignUpButton && (
              <Link to="/register">
                <Button variant="outline" size="sm">Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
