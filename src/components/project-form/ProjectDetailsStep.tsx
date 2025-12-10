
import { ProjectFormData } from "@/pages/StartProject";
import { ProjectBasicFields } from "./fields/ProjectBasicFields";
import { ProjectDateFields } from "./fields/ProjectDateFields";
import { ProjectSizeAndBudgetFields } from "./fields/ProjectSizeAndBudgetFields";
import { ServiceTypeField } from "./fields/ServiceTypeField";
import { FileUploadField } from "./fields/FileUploadField";

interface ProjectDetailsStepProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
}

export const ProjectDetailsStep = ({ formData, setFormData }: ProjectDetailsStepProps) => {
  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Validate file types (only images)
      const validFiles = newFiles.filter(file => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
          console.warn(`File ${file.name} is not an image and will be skipped`);
        }
        return isImage;
      });
      
      setFormData({
        ...formData,
        inspiration_files: [...formData.inspiration_files, ...validFiles]
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = formData.inspiration_files.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      inspiration_files: updatedFiles
    });
  };

  return (
    <div className="space-y-8">
      <ProjectBasicFields formData={formData} handleInputChange={handleInputChange} />
      <ProjectDateFields formData={formData} handleInputChange={handleInputChange} />

      {/* Project Address */}
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Project Address <span className="text-gray-400">*</span>
        </label>
        <input
          type="text"
          value={formData.project_address}
          onChange={(e) => handleInputChange('project_address', e.target.value)}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg"
          required
        />
      </div>

      <ProjectSizeAndBudgetFields formData={formData} handleInputChange={handleInputChange} />
      <ServiceTypeField formData={formData} handleInputChange={handleInputChange} />

      {/* Project Description */}
      <div>
        <label className="block text-portal-dark mb-2 font-medium">
          Project Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg resize-none"
        />
      </div>

      <FileUploadField
        formData={formData}
        handleFileChange={handleFileChange}
        removeFile={removeFile}
      />
    </div>
  );
};
