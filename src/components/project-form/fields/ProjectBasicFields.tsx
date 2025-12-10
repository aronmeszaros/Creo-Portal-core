
import { ProjectFormData } from "@/pages/StartProject";

interface ProjectBasicFieldsProps {
  formData: ProjectFormData;
  handleInputChange: (field: keyof ProjectFormData, value: any) => void;
}

export const ProjectBasicFields = ({ formData, handleInputChange }: ProjectBasicFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Project Name <span className="text-gray-400">*</span>
        </label>
        <input
          type="text"
          value={formData.project_name}
          onChange={(e) => handleInputChange('project_name', e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg"
          required
        />
      </div>
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Project Type <span className="text-gray-400">*</span>
        </label>
        <select
          value={formData.project_type}
          onChange={(e) => handleInputChange('project_type', e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg appearance-none"
          required
        >
          <option value="">Select project type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="hospitality">Hospitality</option>
          <option value="retail">Retail</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};
