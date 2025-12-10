
import { ProjectFormData } from "@/pages/StartProject";
import { StyleOptionsGrid } from "./style-selection/StyleOptionsGrid";
import { StyleDescriptionField } from "./style-selection/StyleDescriptionField";
import { DesignerSelection } from "./designer-selection/DesignerSelection";

interface DesignerSelectionStepProps {
  formData: ProjectFormData;
  setFormData: (data: ProjectFormData) => void;
}

export const DesignerSelectionStep = ({ formData, setFormData }: DesignerSelectionStepProps) => {
  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Style Preferences */}
      <StyleOptionsGrid 
        selectedStyle={formData.preferred_style}
        onStyleChange={(style) => handleInputChange('preferred_style', style)}
      />

      {/* Style Description */}
      <StyleDescriptionField
        value={formData.style_description}
        onChange={(value) => handleInputChange('style_description', value)}
      />

      {/* Designer Selection */}
      <DesignerSelection
        selectedDesignerId={formData.preferred_designer}
        onDesignerChange={(designerId) => handleInputChange('preferred_designer', designerId)}
      />
    </div>
  );
};
