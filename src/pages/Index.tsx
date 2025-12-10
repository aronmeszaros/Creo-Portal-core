
import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DesignersSection } from "@/components/home/DesignersSection";
import { LoginSignupSection } from "@/components/home/LoginSignupSection";
import { Footer } from "@/components/home/Footer";

const Index = () => {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-portal-beige">
      <Header scrollToHowItWorks={scrollToHowItWorks} />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <DesignersSection />
      <LoginSignupSection />
      <Footer scrollToHowItWorks={scrollToHowItWorks} />
    </div>
  );
};

export default Index;
