import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFormSubmissions } from "@/hooks/useFormSubmissions";
import { toast } from "@/hooks/use-toast";
import { ProjectFormData } from "@/pages/StartProject";

export const useProjectForm = () => {
  const { user } = useAuth();
  const { createSubmission } = useFormSubmissions();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ completed: number; total: number } | null>(null);
  
  const [formData, setFormData] = useState<ProjectFormData>({
    project_name: "",
    project_type: "",
    start_date: "",
    end_date: "",
    project_address: "",
    size: null,
    service_type: "consultation",
    description: "",
    inspiration_files: [],
    preferred_designer: "",
    preferred_style: "",
    style_description: ""
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to top when component mounts (when user navigates to form)
  useEffect(() => {
    scrollToTop();
  }, []);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    scrollToTop();
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      project_name: "",
      project_type: "",
      start_date: "",
      end_date: "",
      project_address: "",
      size: null,
      service_type: "consultation",
      description: "",
      inspiration_files: [],
      preferred_designer: "",
      preferred_style: "",
      style_description: ""
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit your project.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(null);
    
    try {
      const submissionData = {
        service_type: formData.service_type,
        description: formData.description,
        budget: formData.project_type, // This needs to be updated based on your budget field
        project_name: formData.project_name,
        project_type: formData.project_type,
        start_date: formData.start_date,
        end_date: formData.end_date,
        project_address: formData.project_address,
        size: formData.size,
        preferred_designer: formData.preferred_designer,
        preferred_style: formData.preferred_style,
        style_description: formData.style_description,
        inspiration_files: formData.inspiration_files
      };

      if (formData.inspiration_files.length > 0) {
        toast({
          title: "Uploading files...",
          description: `Uploading ${formData.inspiration_files.length} inspiration files.`,
        });
      }

      await createSubmission.mutateAsync(submissionData);
      resetForm();
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  return {
    currentStep,
    setCurrentStep: handleStepChange,
    formData,
    setFormData,
    isSubmitting,
    uploadProgress,
    handleSubmit,
    resetForm
  };
};
