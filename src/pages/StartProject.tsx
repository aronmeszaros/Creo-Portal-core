
import { ProtectedRoute } from "@/components/dashboard/ProtectedRoute";
import { ProjectDetailsStep } from "@/components/project-form/ProjectDetailsStep";
import { DesignerSelectionStep } from "@/components/project-form/DesignerSelectionStep";
import { ProjectFormHeader } from "@/components/project-form/ProjectFormHeader";
import { FormTabs } from "@/components/project-form/FormTabs";
import { UploadProgressIndicator } from "@/components/project-form/UploadProgressIndicator";
import { FormNavigation } from "@/components/project-form/FormNavigation";
import { useProjectForm } from "@/hooks/useProjectForm";

export interface ProjectFormData {
  // Project Details
  project_name: string;
  project_type: string;
  start_date: string;
  end_date: string;
  project_address: string;
  size: number | null;
  service_type: string;
  description: string;
  inspiration_files: File[];
  
  // Designer Selection & Style Preferences
  preferred_designer: string;
  preferred_style: string;
  style_description: string;
}

const StartProjectContent = () => {
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    isSubmitting,
    uploadProgress,
    handleSubmit
  } = useProjectForm();

  const steps = [
    { id: "project-details", title: "Project Details", component: ProjectDetailsStep },
    { id: "designer-selection", title: "Designer Selection", component: DesignerSelectionStep }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-white">
      <ProjectFormHeader />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white">
          <h1 className="text-4xl lg:text-5xl font-light text-portal-dark leading-tight mb-12 tracking-wider uppercase font-cinzel">
            Start a Project
          </h1>
          
          <FormTabs 
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />

          {/* Form Content */}
          <div className="mb-12">
            <CurrentStepComponent 
              formData={formData}
              setFormData={setFormData}
            />
          </div>

          <UploadProgressIndicator uploadProgress={uploadProgress} />

          <FormNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            isSubmitting={isSubmitting}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

const StartProject = () => {
  return (
    <ProtectedRoute>
      <StartProjectContent />
    </ProtectedRoute>
  );
};

export default StartProject;
