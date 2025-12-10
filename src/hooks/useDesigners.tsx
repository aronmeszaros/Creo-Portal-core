
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "./use-toast";

interface Designer {
  id: string;
  name: string;
  email: string | null;
  specialization: string | null;
  description: string | null;
  avatar_url: string | null;
  years_experience: number | null;
  portfolio_images: string[] | null;
  created_at: string;
  updated_at: string;
}

interface DesignerPassword {
  id: string;
  designer_id: string;
  password: string;
  created_at: string;
  is_used: boolean;
  notes: string | null;
}

interface CreateDesignerData {
  name: string;
  email: string;
  specialization?: string;
  description?: string;
  years_experience?: number;
}

export const useDesigners = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const { data: designers, isLoading } = useQuery({
    queryKey: ['designers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('designers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching designers:', error);
        throw error;
      }

      return data as Designer[];
    },
    enabled: isAdmin,
  });

  const { data: designerPasswords } = useQuery({
    queryKey: ['designer-passwords'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('designer_passwords')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching designer passwords:', error);
        throw error;
      }

      return data as DesignerPassword[];
    },
    enabled: isAdmin,
  });

  const getDesignerPassword = (designerId: string) => {
    return designerPasswords?.find(p => p.designer_id === designerId);
  };

  const createDesigner = useMutation({
    mutationFn: async (designerData: CreateDesignerData) => {
      console.log('Creating designer with data:', designerData);

      try {
        // Call the edge function to create the designer account
        const { data, error } = await supabase.functions.invoke('create-designer-account', {
          body: designerData
        });

        if (error) {
          console.error('Error calling create-designer-account function:', error);
          throw error;
        }

        if (!data.success) {
          console.error('Designer creation failed:', data.error);
          throw new Error(data.error);
        }

        console.log('Designer creation completed successfully:', data);
        return data;
      } catch (error) {
        console.error('Error in designer creation process:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('Designer creation completed successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['designers'] });
      queryClient.invalidateQueries({ queryKey: ['designer-passwords'] });
      toast({
        title: "Designer created successfully!",
        description: `The designer account has been created. Temporary password: ${data.tempPassword}. Please share this securely with the designer.`,
      });
    },
    onError: (error: any) => {
      console.error('Error creating designer:', error);
      toast({
        title: "Failed to create designer",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const updateDesigner = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Designer> & { id: string }) => {
      const { data, error } = await supabase
        .from('designers')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating designer:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designers'] });
      toast({
        title: "Designer updated successfully!",
        description: "The designer information has been updated.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating designer:', error);
      toast({
        title: "Failed to update designer",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const deleteDesigner = useMutation({
    mutationFn: async (designerId: string) => {
      // First get the linked user account
      const { data: designerAccount, error: linkError } = await supabase
        .from('designer_accounts')
        .select('user_id')
        .eq('designer_id', designerId)
        .single();

      if (linkError && linkError.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching designer account link:', linkError);
        throw linkError;
      }

      // Delete the designer record (this will cascade to designer_accounts and designer_passwords due to foreign key)
      const { error: designerError } = await supabase
        .from('designers')
        .delete()
        .eq('id', designerId);

      if (designerError) {
        console.error('Error deleting designer:', designerError);
        throw designerError;
      }

      // If we found a linked user account, delete the auth user and profile
      if (designerAccount?.user_id) {
        // Delete profile
        await supabase
          .from('profiles')
          .delete()
          .eq('id', designerAccount.user_id);

        // Delete auth user
        await supabase.auth.admin.deleteUser(designerAccount.user_id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designers'] });
      queryClient.invalidateQueries({ queryKey: ['designer-passwords'] });
      toast({
        title: "Designer deleted successfully!",
        description: "The designer account and login access have been removed.",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting designer:', error);
      toast({
        title: "Failed to delete designer",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  return {
    designers: designers || [],
    isLoading,
    createDesigner,
    updateDesigner,
    deleteDesigner,
    getDesignerPassword,
  };
};
