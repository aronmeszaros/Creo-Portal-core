
import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ServicesSection = () => {
  const [openServices, setOpenServices] = useState<{ [key: number]: boolean }>({});

  const toggleService = (index: number) => {
    setOpenServices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const services = [
    {
      title: "SINGLE DESIGN CONSULTATION",
      price: "75 €",
      description: "Get expert advice on a specific design challenge or question you have about your space.",
      features: [
        "30-minute video consultation",
        "Professional design advice", 
        "Personalized recommendations",
        "Follow-up email summary"
      ]
    },
    {
      title: "FULL DESIGN CONCEPT", 
      price: "200 €",
      description: "From the information you have provided our designer will create floorplans and elevations, as well as a moodboard to detail the proposed layout, design and furnishings to create your ideal living space. They will also offer two 60 minute consultations.",
      features: [
        "Detailed space analysis",
        "Custom mood board creation",
        "Color palette selection", 
        "Furniture layout plans",
        "Shopping list with links"
      ]
    },
    {
      title: "DESIGN CONCEPT AND PROCUREMENT",
      price: "750 €", 
      description: "Full design service including concept development and assistance with purchasing and implementation.",
      features: [
        "Everything in Full Design Concept",
        "Product sourcing and procurement",
        "Vendor coordination",
        "Installation guidance", 
        "3-month follow-up support"
      ]
    }
  ];

  return (
    <section className="py-20 bg-portal-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl lg:text-5xl font-light text-portal-dark mb-8 tracking-wide font-cinzel">
              OUR DESIGN SERVICES
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Portal offers a range of services, from a single consultation all the way to purchasing furniture and furnishings for you.
            </p>
          </div>
          
          <div className="space-y-8">
            {services.map((service, index) => (
              <Collapsible key={index} open={openServices[index]} onOpenChange={() => toggleService(index)}>
                <div className="border-b border-gray-300 pb-6">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between group cursor-pointer">
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-light text-portal-dark mb-2 tracking-wide group-hover:text-portal-sage transition-colors font-cinzel">
                          {service.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-light text-portal-dark">
                          {service.price}
                        </span>
                        {openServices[index] ? (
                          <ChevronUp className="w-5 h-5 text-portal-dark group-hover:text-portal-sage transition-colors" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-portal-dark group-hover:text-portal-sage transition-colors" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="mt-4">
                    <div className="text-left">
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-portal-sage mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
