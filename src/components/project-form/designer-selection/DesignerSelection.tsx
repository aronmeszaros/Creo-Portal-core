
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DesignerDetails } from "./DesignerDetails";

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

interface DesignerSelectionProps {
  selectedDesignerId: string;
  onDesignerChange: (designerId: string) => void;
}

export const DesignerSelection = ({ selectedDesignerId, onDesignerChange }: DesignerSelectionProps) => {
  const { data: designers, isLoading } = useQuery({
    queryKey: ['designers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('designers')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching designers:', error);
        throw error;
      }

      return data as Designer[];
    },
  });

  const selectedDesigner = designers?.find(d => d.id === selectedDesignerId);

  if (isLoading) {
    return <div className="text-center py-8">Loading designers...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Designer Selection */}
      <div>
        <label className="block text-portal-dark mb-4 font-medium">
          Preferred Designer <span className="text-gray-400">*</span>
        </label>
        <select
          value={selectedDesignerId}
          onChange={(e) => onDesignerChange(e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg appearance-none"
          required
        >
          <option value="">Select designer</option>
          {designers?.map((designer) => (
            <option key={designer.id} value={designer.id}>
              {designer.name}
            </option>
          ))}
        </select>
      </div>

      {/* Designer Details */}
      {selectedDesigner && <DesignerDetails designer={selectedDesigner} />}

      {/* Next Steps Information */}
      <div className="bg-gray-50 p-6">
        <h3 className="text-lg font-medium text-portal-dark mb-3">Next Steps</h3>
        <p className="text-gray-700">
          After submitting your information, our team will review your project details and your selected designer will contact you within 2 business days to discuss your project further and schedule an initial consultation.
        </p>
      </div>
    </div>
  );
};
