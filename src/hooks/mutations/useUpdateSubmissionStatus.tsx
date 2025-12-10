
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

export const useUpdateSubmissionStatus = () => {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ submissionId, status }: { submissionId: string; status: 'new' | 'in-progress' | 'completed' }) => {
      if (!user || !isAdmin) throw new Error('Unauthorized');

      const { data, error } = await supabase
        .from('form_submissions')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', submissionId)
        .select()
        .single();

      if (error) {
        console.error('Error updating submission status:', error);
        throw error;
      }

      // Send status update notification email
      try {
        console.log('Calling notification function for status update:', submissionId);
        const { error: notificationError } = await supabase.functions.invoke('send-notification', {
          body: {
            type: 'status_updated',
            submissionId: submissionId
          }
        });

        if (notificationError) {
          console.error('Error sending status update notification:', notificationError);
          // Don't throw error here - status update was successful, just log the notification issue
        } else {
          console.log('Status update notification sent successfully');
        }
      } catch (notificationError) {
        console.error('Failed to send status update notification:', notificationError);
        // Don't throw error here - status update was successful
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form-submissions'] });
      toast({
        title: "Status updated successfully!",
        description: "The submission status has been updated and the client has been notified.",
      });
    },
    onError: (error: any) => {
      console.error('Error updating submission status:', error);
      toast({
        title: "Update failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
};
