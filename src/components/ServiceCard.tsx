
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
}

export const ServiceCard = ({ title, price, description, features }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-white hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardContent className="p-6">
        <div 
          className="flex justify-between items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>
            <h3 className="text-xl font-bold text-portal-dark mb-1">{title}</h3>
            <p className="text-2xl font-bold text-portal-sage">{price}</p>
          </div>
          <Button variant="ghost" size="sm" className="portal-sage-hover">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 animate-fade-in">
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-portal-sage rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="portal-sage text-white hover:opacity-90 w-full mt-4">
              Choose This Service
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
