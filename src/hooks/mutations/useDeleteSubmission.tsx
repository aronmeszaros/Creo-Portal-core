
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export const useDeleteSubmission = () => {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submissionId: string) => {
      if (!user || !isAdmin) throw new Error('Unauthorized - Only admins can delete submissions');

      const { error } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', submissionId);

      if (error) {
        console.error('Error deleting submission:', error);
        throw error;
      }

      return submissionId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form-submissions'] });
      toast({
        title: "Submission deleted successfully!",
        description: "The submission has been permanently removed.",
      });
    },
    onError: (error: any) => {
      console.error('Error deleting submission:', error);
      toast({
        title: "Delete failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
};
