
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useDesigners } from "@/hooks/useDesigners";
import { DesignerForm } from "./DesignerForm";
import { DashboardStats } from "./DashboardStats";
import { DesignerTable } from "./DesignerTable";
import { DesignerFormModal } from "./DesignerFormModal";

interface DesignerFormData {
  name: string;
  email: string;
  specialization: string;
  description: string;
  years_experience: string;
  portfolio_images: string[];
}

export const DesignerManagement = () => {
  const { designers, isLoading, createDesigner, updateDesigner, deleteDesigner, getDesignerPassword } = useDesigners();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDesigner, setEditingDesigner] = useState<any>(null);
  
  const [formData, setFormData] = useState<DesignerFormData>({
    name: "",
    email: "",
    specialization: "",
    description: "",
    years_experience: "",
    portfolio_images: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      years_experience: formData.years_experience ? parseInt(formData.years_experience) : undefined,
      portfolio_images: formData.portfolio_images || []
    };

    if (editingDesigner) {
      await updateDesigner.mutateAsync({ id: editingDesigner.id, ...submitData });
      setEditingDesigner(null);
    } else {
      await createDesigner.mutateAsync(submitData);
      setIsCreateModalOpen(false);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      specialization: "",
      description: "",
      years_experience: "",
      portfolio_images: []
    });
  };

  const handleEdit = (designer: any) => {
    setEditingDesigner(designer);
    setFormData({
      name: designer.name,
      email: designer.email || "",
      specialization: designer.specialization || "",
      description: designer.description || "",
      years_experience: designer.years_experience?.toString() || "",
      portfolio_images: designer.portfolio_images || []
    });
  };

  const handleDelete = async (designerId: string) => {
    if (window.confirm("Are you sure you want to delete this designer? This will also remove their login access.")) {
      await deleteDesigner.mutateAsync(designerId);
    }
  };

  const handleCancel = () => {
    setIsCreateModalOpen(false);
    setEditingDesigner(null);
    resetForm();
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="w-8 h-8 border-2 border-portal-sage/30 border-t-portal-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-portal-dark/60">Loading designers...</p>
      </div>
    );
  }

  // Create a mock submissions array for the stats component
  const mockSubmissions = Array(designers.length).fill({ status: 'completed' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-light text-portal-dark tracking-wide font-cinzel">
            Designer Management
          </h2>
          <p className="text-portal-dark/60">
            Create and manage designer accounts with login access
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-portal-sage hover:bg-portal-sage/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Designer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Designer Account</DialogTitle>
              <DialogDescription>
                Add a new designer to your team. They will receive login credentials via email.
              </DialogDescription>
            </DialogHeader>
            <DesignerForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={createDesigner.isPending}
              isEditMode={false}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats - Use DashboardStats instead of DesignerStats for consistency */}
      <DashboardStats submissions={mockSubmissions} />

      {/* Designers Table */}
      <DesignerTable
        designers={designers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getDesignerPassword={getDesignerPassword}
      />

      {/* Edit Modal */}
      <DesignerFormModal
        isOpen={!!editingDesigner}
        onClose={() => setEditingDesigner(null)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isLoading={updateDesigner.isPending}
        isEditMode={true}
        title="Edit Designer"
        description="Update designer information and account details."
        designerId={editingDesigner?.id}
      />
    </div>
  );
};
