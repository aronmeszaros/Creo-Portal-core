
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, ImageIcon } from "lucide-react";
import { uploadMultiplePortfolioImages, deletePortfolioImage } from "@/utils/portfolioUpload";
import { toast } from "@/hooks/use-toast";

interface PortfolioImageManagerProps {
  designerId: string;
  currentImages: string[];
  onImagesChange: (images: string[]) => void;
  disabled?: boolean;
}

export const PortfolioImageManager: React.FC<PortfolioImageManagerProps> = ({
  designerId,
  currentImages,
  onImagesChange,
  disabled = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = 4 - currentImages.length;
    if (files.length > remainingSlots) {
      toast({
        title: "Too many files",
        description: `You can only upload ${remainingSlots} more image(s). Maximum is 4 portfolio images.`,
        variant: "destructive",
      });
      return;
    }

    const fileArray = Array.from(files);
    
    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload only JPEG, PNG, or WebP images.",
        variant: "destructive",
      });
      return;
    }

    // Validate file sizes (max 5MB each)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: "Each image must be smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = await uploadMultiplePortfolioImages(
        fileArray,
        designerId,
        (completed, total) => {
          setUploadProgress((completed / total) * 100);
        }
      );

      const newImages = [...currentImages, ...uploadedUrls];
      onImagesChange(newImages);

      toast({
        title: "Images uploaded successfully!",
        description: `${uploadedUrls.length} portfolio image(s) have been uploaded.`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload portfolio images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Extract the path from the URL for deletion
      const urlParts = imageUrl.split('/');
      const bucketIndex = urlParts.findIndex(part => part === 'designer-portfolios');
      if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
        const path = urlParts.slice(bucketIndex + 1).join('/');
        await deletePortfolioImage(path);
      }

      const newImages = currentImages.filter((_, i) => i !== index);
      onImagesChange(newImages);

      toast({
        title: "Image removed",
        description: "Portfolio image has been removed successfully.",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: "Removal failed",
        description: "Failed to remove image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label>Portfolio Images (Maximum 4)</Label>
      
      {/* Current Images Grid */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {currentImages.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="h-32 bg-gray-200 rounded overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(imageUrl, index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Section */}
      {currentImages.length < 4 && !disabled && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <Label htmlFor="portfolio-upload" className="cursor-pointer">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                Click to upload portfolio images ({currentImages.length}/4)
              </div>
              <div className="text-xs text-gray-500">
                JPEG, PNG, WebP up to 5MB each
              </div>
            </div>
          </Label>
          <Input
            id="portfolio-upload"
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
            disabled={uploading}
          />
          
          {uploading && (
            <div className="mt-4">
              <div className="text-sm text-gray-600 mb-2">
                Uploading... {Math.round(uploadProgress)}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-portal-sage h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {currentImages.length >= 4 && (
        <div className="text-sm text-gray-500 text-center p-4 bg-gray-50 rounded">
          Maximum of 4 portfolio images reached. Remove an image to upload a new one.
        </div>
      )}
    </div>
  );
};
