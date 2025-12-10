
import { supabase } from "@/integrations/supabase/client";

export interface UploadResult {
  url: string;
  path: string;
}

export const uploadInspirationFile = async (
  file: File,
  userId: string
): Promise<UploadResult> => {
  // Create a unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from('inspiration-files')
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('inspiration-files')
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path
  };
};

export const uploadMultipleFiles = async (
  files: File[],
  userId: string,
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> => {
  const uploadPromises = files.map(async (file, index) => {
    try {
      const result = await uploadInspirationFile(file, userId);
      onProgress?.(index + 1, files.length);
      return result.url;
    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw error;
    }
  });

  return Promise.all(uploadPromises);
};
