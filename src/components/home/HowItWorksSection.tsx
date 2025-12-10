import { useState } from "react";

export const HowItWorksSection = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      number: "I",
      title: "Choose the level of service you need and create an account with us",
      description: "Share your vision, style preferences, and budget through our simple consultation form."
    },
    {
      number: "II", 
      title: "Provide necessary information",
      description: "We'll connect you with a professional designer who specializes in your style and needs."
    },
    {
      number: "III",
      title: "One of our designers will contact you", 
      description: "Receive your custom design plan and bring your dream space to life."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Layout - Title and Description */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-portal-dark font-cinzel">
              HOW IT WORKS?
            </h2>
          </div>
          <div>
            <p className="text-lg text-gray-600 leading-relaxed font-inter">
              Choose the type/level of service you require, create an account with us. Once you are registered you can submit all your wishes and requirements, as well as provide us with the necessary information for us to deliver a personalised solution and design.
            </p>
          </div>
        </div>

        {/* Timeline Effect */}
        <div className="relative">
          {/* Horizontal Line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300 z-0 hidden md:block"></div>
          
          {/* Timeline Steps */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Circle */}
                <div className="flex justify-start mb-6">
                  <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-light text-portal-dark font-cinzel">{step.number}</span>
                  </div>
                </div>
                
                {/* Step Content */}
                <div className="text-left">
                  <h3 className="text-lg font-medium text-portal-dark mb-2 cursor-pointer hover:text-portal-sage transition-colors leading-relaxed font-inter">
                    {step.title}
                  </h3>
                  
                  {/* Separator line - only show when hovered */}
                  {hoveredStep === index && (
                    <div className="w-12 h-0.5 bg-portal-sage mb-3 transition-all duration-300"></div>
                  )}
                  
                  {/* Hover Description - inside the div */}
                  {hoveredStep === index && (
                    <p className="text-sm text-gray-600 leading-relaxed animate-fade-in font-inter">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
