
import { ProjectFormData } from "@/pages/StartProject";

interface ProjectSizeAndBudgetFieldsProps {
  formData: ProjectFormData;
  handleInputChange: (field: keyof ProjectFormData, value: any) => void;
}

export const ProjectSizeAndBudgetFields = ({ formData, handleInputChange }: ProjectSizeAndBudgetFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Size (sqm)
        </label>
        <input
          type="number"
          value={formData.size || ''}
          onChange={(e) => handleInputChange('size', e.target.value ? parseInt(e.target.value) : null)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg"
        />
      </div>
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Budget Range <span className="text-gray-400">*</span>
        </label>
        <select
          value={formData.project_type}
          onChange={(e) => handleInputChange('project_type', e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg appearance-none"
          required
        >
          <option value="">Select budget range</option>
          <option value="below-50k">Below $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k-250k">$100,000 - $250,000</option>
          <option value="250k-500k">$250,000 - $500,000</option>
          <option value="above-500k">Above $500,000</option>
        </select>
      </div>
    </div>
  );
};
