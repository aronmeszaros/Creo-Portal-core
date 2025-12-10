import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const { user } = useAuth();

  const images = [
    "/uploads/be15553a-6b3f-44c2-86b7-c1c98755c5b3.png",
    "/uploads/6a4072fa-5653-4a27-b906-22c3ecb0b660.png",
    "/uploads/119c4849-d33c-4548-8798-fa42c86b4177.png",
    "/uploads/ec841f70-37d1-45d0-a4cc-42bb844a898a.png"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      setNextImageIndex(nextIndex);
      setIsTransitioning(true);
      
      // After transition completes, update current index
      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setIsTransitioning(false);
      }, 1000); // Changed from 1500 to 1000ms for 1 second crossfade
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  // Preload all images for smooth transitions
  useEffect(() => {
    images.forEach((imageSrc) => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);

  const scrollToLoginSignup = () => {
    const element = document.getElementById('login-signup');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProjectClick = () => {
    if (user) {
      // User is logged in, navigate to start-project page
      window.location.href = '/start-project';
    } else {
      // User is not logged in, scroll to login/signup section
      scrollToLoginSignup();
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-portal-dark mb-6 leading-tight font-cinzel">
              CREATE YOUR<br />
              <span className="text-portal-sage">DREAM HOME</span><br />
              WITH PORTAL
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg font-inter">
              Professional interior design services tailored to your style and budget. Transform your space with our expert designers.
            </p>
            <Button 
              onClick={handleStartProjectClick}
              className="bg-portal-sage hover:bg-portal-sage/90 text-white px-8 py-4 text-lg font-inter font-medium"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="relative">
            <div className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden">
              {images.map((imageSrc, index) => (
                <img
                  key={index}
                  src={imageSrc}
                  alt={`Beautiful interior design ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out will-change-transform ${
                    index === currentImageIndex
                      ? isTransitioning
                        ? 'opacity-0'
                        : 'opacity-100'
                      : index === nextImageIndex && isTransitioning
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                  style={{
                    zIndex: index === nextImageIndex && isTransitioning ? 3 : index === currentImageIndex ? 2 : 1,
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
