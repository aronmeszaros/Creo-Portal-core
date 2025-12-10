
import { User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { SignUpForm } from "@/components/auth/SignUpForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-portal-beige flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/561a35d9-ac29-4804-b76e-c08fc3f916c3.png" 
                alt="Portal by CreoDesigns" 
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex space-x-4">
              <Link to="/start-project">
                <Button variant="ghost" size="sm" className="text-portal-dark hover:text-portal-sage">
                  Start a Project
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mt-16">
        <Card className="shadow-xl border-0 animate-scale-in bg-white">
          <CardHeader className="text-center pb-4">
            <div className="w-12 h-12 bg-portal-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-portal-sage" />
            </div>
            <CardTitle className="text-2xl font-bold text-portal-dark font-cinzel">Create Account</CardTitle>
            <CardDescription className="text-gray-600">
              Join Portal to submit and track your project inquiries
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-0">
            <SignUpForm />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-portal-sage hover:text-portal-sage/80 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
