
interface Designer {
  id: string;
  name: string;
  email: string;
  specialization: string;
  description: string;
  years_experience: number;
  portfolio_images: string[];
  avatar_url: string;
}

interface DesignerDetailsProps {
  designer: Designer;
}

export const DesignerDetails = ({ designer }: DesignerDetailsProps) => {
  // Ensure we have an array of portfolio images, defaulting to empty array if null
  const portfolioImages = designer.portfolio_images || [];
  
  return (
    <div className="border border-gray-300 p-6">
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-medium text-portal-dark mb-2">
            {designer.name}
          </h3>
          <p className="text-portal-sage font-medium mb-2">
            {designer.specialization}
          </p>
          <p className="text-gray-600 mb-2">
            {designer.years_experience} years of experience
          </p>
          <p className="text-gray-700">
            {designer.description}
          </p>
        </div>
      </div>

      {/* Portfolio Gallery - Show 4 images in a 2x2 grid */}
      <div className="grid grid-cols-2 gap-4">
        {portfolioImages.slice(0, 4).map((image, index) => (
          <div key={index} className="h-32 bg-gray-200 rounded overflow-hidden">
            <img 
              src={image} 
              alt={`${designer.name} portfolio ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Hide broken images
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        ))}
        
        {/* Show placeholders for missing images */}
        {portfolioImages.length < 4 && Array.from({ length: 4 - portfolioImages.length }).map((_, index) => (
          <div key={`placeholder-${index}`} className="h-32 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        ))}
      </div>
    </div>
  );
};
