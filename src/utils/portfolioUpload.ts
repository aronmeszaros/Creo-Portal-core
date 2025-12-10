
import { supabase } from "@/integrations/supabase/client";

export interface PortfolioUploadResult {
  url: string;
  path: string;
}

export const uploadPortfolioImage = async (
  file: File,
  designerId: string
): Promise<PortfolioUploadResult> => {
  // Create a unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${designerId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('designer-portfolios')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading portfolio image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('designer-portfolios')
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path
  };
};

export const deletePortfolioImage = async (path: string): Promise<void> => {
  const { error } = await supabase.storage
    .from('designer-portfolios')
    .remove([path]);

  if (error) {
    console.error('Error deleting portfolio image:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

export const uploadMultiplePortfolioImages = async (
  files: File[],
  designerId: string,
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> => {
  const uploadPromises = files.map(async (file, index) => {
    try {
      const result = await uploadPortfolioImage(file, designerId);
      onProgress?.(index + 1, files.length);
      return result.url;
    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw error;
    }
  });

  return Promise.all(uploadPromises);
};
