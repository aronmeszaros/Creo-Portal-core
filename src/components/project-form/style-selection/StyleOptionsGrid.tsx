
import { ProjectFormData } from "@/pages/StartProject";

const styleOptions = [
  { 
    value: "modern", 
    label: "Modern", 
    description: "Clean lines, minimalist approach, contemporary materials",
    image: "/uploads/af075186-1561-42d3-bc21-4759c60112e6.png"
  },
  { 
    value: "traditional", 
    label: "Traditional", 
    description: "Classic designs, timeless elegance, rich textures",
    image: "/uploads/23dfad0c-2a9f-488a-91a7-3cd38a088671.png"
  },
  { 
    value: "minimalist", 
    label: "Minimalist", 
    description: "Less is more, neutral colors, functional design",
    image: "/uploads/2dc366ab-b837-46c2-95ae-decf26e78e03.png"
  },
  { 
    value: "industrial", 
    label: "Industrial", 
    description: "Raw materials, exposed elements, urban aesthetic",
    image: "/uploads/8cea95b3-dfc3-4625-b365-671bf0ffbb2a.png"
  },
  { 
    value: "scandinavian", 
    label: "Scandinavian", 
    description: "Light colors, natural materials, cozy atmosphere",
    image: "/uploads/817c6398-f6cc-4076-8c0b-a57dbc69ac58.png"
  },
  { 
    value: "bohemian", 
    label: "Bohemian", 
    description: "Eclectic mix, vibrant colors, artistic elements",
    image: "/uploads/c3fe48de-f8e3-49d4-aa32-fecdb1108264.png"
  },
  { 
    value: "rustic", 
    label: "Rustic", 
    description: "Natural textures, vintage elements, countryside charm",
    image: "/uploads/9b1c8d5a-125d-4875-b2a9-4b687bc46442.png"
  },
  { 
    value: "contemporary", 
    label: "Contemporary", 
    description: "Current trends, innovative materials, bold statements",
    image: "/uploads/fb4789ff-974c-4afb-bc86-32ca7c63850a.png"
  },
  { 
    value: "other", 
    label: "Other", 
    description: "Something unique or a mix of different styles"
  }
];

interface StyleOptionsGridProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export const StyleOptionsGrid = ({ selectedStyle, onStyleChange }: StyleOptionsGridProps) => {
  const stylesWithImages = styleOptions.filter(style => style.image);
  const otherOption = styleOptions.find(style => style.value === "other");

  return (
    <div>
      <label className="block text-portal-dark mb-4 font-medium">
        Preferred Style <span className="text-gray-400">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {stylesWithImages.map((style) => (
          <div 
            key={style.value}
            className={`border cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
              selectedStyle === style.value
                ? 'border-portal-sage bg-portal-sage/5 ring-2 ring-portal-sage/20'
                : 'border-gray-300 hover:border-portal-sage/50'
            }`}
            onClick={() => onStyleChange(style.value)}
          >
            {/* Style Image */}
            <div className="h-32 bg-gray-100 relative overflow-hidden">
              <img 
                src={style.image} 
                alt={`${style.label} interior design style`}
                className="w-full h-full object-cover"
              />
              
              {selectedStyle === style.value && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-portal-sage rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            
            {/* Style Info */}
            <div className="p-4">
              <div>
                <h4 className="font-medium text-portal-dark">{style.label}</h4>
                <p className="text-sm text-gray-600">{style.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Other option - spans both columns */}
        {otherOption && (
          <div 
            className={`md:col-span-2 border cursor-pointer transition-all duration-200 rounded-lg overflow-hidden py-4 ${
              selectedStyle === otherOption.value
                ? 'border-portal-sage bg-portal-sage/5 ring-2 ring-portal-sage/20'
                : 'border-gray-300 hover:border-portal-sage/50'
            }`}
            onClick={() => onStyleChange(otherOption.value)}
          >
            <div className="h-16 flex items-center justify-center">
              {selectedStyle === otherOption.value && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-portal-sage rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
              <div className="p-4">
                <h4 className="font-medium text-portal-dark mb-2">{otherOption.label}</h4>
                <p className="text-sm text-gray-600">{otherOption.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
