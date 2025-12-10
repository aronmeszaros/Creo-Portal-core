
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DesignerForm } from "./DesignerForm";

interface DesignerFormData {
  name: string;
  email: string;
  specialization: string;
  description: string;
  years_experience: string;
  portfolio_images: string[];
}

interface DesignerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: DesignerFormData;
  setFormData: (data: DesignerFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isEditMode: boolean;
  title: string;
  description: string;
  designerId?: string;
}

export const DesignerFormModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isLoading,
  isEditMode,
  title,
  description,
  designerId
}: DesignerFormModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DesignerForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
          isEditMode={isEditMode}
          designerId={designerId}
        />
      </DialogContent>
    </Dialog>
  );
};
