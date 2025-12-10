
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PortfolioImageManager } from "./PortfolioImageManager";

interface DesignerFormData {
  name: string;
  email: string;
  specialization: string;
  description: string;
  years_experience: string;
  portfolio_images: string[];
}

interface DesignerFormProps {
  formData: DesignerFormData;
  setFormData: (data: DesignerFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditMode: boolean;
  designerId?: string;
}

export const DesignerForm: React.FC<DesignerFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isLoading,
  isEditMode,
  designerId
}) => {
  const handlePortfolioImagesChange = (images: string[]) => {
    setFormData({ ...formData, portfolio_images: images });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="specialization">Specialization</Label>
          <Input
            id="specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            placeholder="e.g., Interior Design, Architecture"
          />
        </div>
        <div>
          <Label htmlFor="years_experience">Years of Experience</Label>
          <Input
            id="years_experience"
            type="number"
            value={formData.years_experience}
            onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
            placeholder="e.g., 5"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description of the designer's expertise and style..."
          rows={3}
        />
      </div>

      {/* Portfolio Images Section */}
      {designerId && (
        <PortfolioImageManager
          designerId={designerId}
          currentImages={formData.portfolio_images || []}
          onImagesChange={handlePortfolioImagesChange}
          disabled={isLoading}
        />
      )}

      {!designerId && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            Portfolio images can be uploaded after creating the designer account.
          </p>
        </div>
      )}
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : isEditMode ? 'Update Designer' : 'Create Designer'}
        </Button>
      </div>
    </form>
  );
};
