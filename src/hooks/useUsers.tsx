
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
  is_admin: boolean | null;
}

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      console.log("Fetching users data");
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        throw error;
      }

      console.log("Users data fetched successfully:", data.length);
      return data as User[];
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      console.log("Deleting user:", userId);
      
      const { data, error } = await supabase.functions.invoke('delete-user-account', {
        body: { userId }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error);
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: "User deleted",
        description: data.message || "User has been deleted successfully",
      });
    },
    onError: (error: any) => {
      console.error("Error deleting user:", error);
      toast({
        title: "Deletion failed",
        description: error.message || "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    users,
    isLoading,
    error,
    deleteUser,
  };
};
