
import { ProjectFormData } from "@/pages/StartProject";

interface ProjectDateFieldsProps {
  formData: ProjectFormData;
  handleInputChange: (field: keyof ProjectFormData, value: any) => void;
}

export const ProjectDateFields = ({ formData, handleInputChange }: ProjectDateFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Start Date <span className="text-gray-400">*</span>
        </label>
        <input
          type="date"
          value={formData.start_date}
          onChange={(e) => handleInputChange('start_date', e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg"
          required
        />
      </div>
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Estimated Completion Date
        </label>
        <input
          type="date"
          value={formData.end_date}
          onChange={(e) => handleInputChange('end_date', e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg"
        />
      </div>
    </div>
  );
};
