
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const LoginSignupSection = () => {
  const { user } = useAuth();

  return (
    <section id="login-signup" className="py-20 bg-portal-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-portal-dark mb-6 font-cinzel">
              Start Your Project Today
            </h2>
            <p className="text-xl text-gray-600 font-inter">
              Ready to transform your space? Create an account to submit and track your project inquiries.
            </p>
          </div>
          
          {user ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
              <h3 className="text-2xl font-bold text-portal-dark mb-4 font-cinzel">Welcome back!</h3>
              <p className="text-gray-600 mb-8 font-inter">You're already logged in. Start your next design project with us.</p>
              <Link to="/start-project">
                <Button className="bg-portal-sage hover:bg-portal-sage/90 text-white px-8 py-4 text-lg font-inter font-medium">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Sign Up Option */}
                <div className="flex flex-col text-center p-6 border border-gray-200 rounded-xl hover:border-portal-sage transition-colors">
                  <h3 className="text-2xl font-bold text-portal-dark mb-4 font-cinzel">New to Portal?</h3>
                  <p className="text-gray-600 mb-6 font-inter flex-grow">Create your account and start your first design project with us.</p>
                  <Link to="/register" className="mt-auto">
                    <Button className="w-full bg-portal-sage hover:bg-portal-sage/90 text-white px-6 py-3 text-lg font-inter font-medium">
                      Sign Up Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
                
                {/* Log In Option */}
                <div className="flex flex-col text-center p-6 border border-gray-200 rounded-xl hover:border-portal-sage transition-colors">
                  <h3 className="text-2xl font-bold text-portal-dark mb-4 font-cinzel">Already have an account?</h3>
                  <p className="text-gray-600 mb-6 font-inter flex-grow">Welcome back! Log in to continue working on your projects.</p>
                  <Link to="/login" className="mt-auto">
                    <Button variant="outline" className="w-full border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white px-6 py-3 text-lg font-inter font-medium">
                      Log In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
