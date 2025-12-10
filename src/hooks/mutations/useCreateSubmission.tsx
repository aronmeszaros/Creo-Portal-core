
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { uploadMultipleFiles } from "@/utils/fileUpload";
import { CreateSubmissionData } from "@/types/submission";

export const useCreateSubmission = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (submissionData: CreateSubmissionData) => {
      if (!user) throw new Error('User not authenticated');

      console.log('Creating submission with data:', submissionData);

      // Fetch user profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, email, phone')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        throw new Error('Could not fetch user profile');
      }

      let inspirationFileUrls: string[] = [];

      // Upload inspiration files if any
      if (submissionData.inspiration_files && submissionData.inspiration_files.length > 0) {
        try {
          console.log('Uploading inspiration files:', submissionData.inspiration_files.length);
          inspirationFileUrls = await uploadMultipleFiles(
            submissionData.inspiration_files,
            user.id,
            (completed, total) => {
              console.log(`Uploaded ${completed}/${total} files`);
            }
          );
          console.log('File upload completed. URLs:', inspirationFileUrls);
        } catch (uploadError) {
          console.error('Error uploading files:', uploadError);
          throw new Error('Failed to upload inspiration files');
        }
      }

      // Prepare submission data without File objects
      const { inspiration_files, ...restSubmissionData } = submissionData;
      
      // Combine submission data with profile data
      const fullSubmissionData = {
        ...restSubmissionData,
        full_name: profile.full_name || user.email || 'Unknown',
        email: profile.email || user.email || '',
        phone: profile.phone || '',
        user_id: user.id,
        status: 'new',
        inspiration_files: inspirationFileUrls,
      };

      const { data, error } = await supabase
        .from('form_submissions')
        .insert([fullSubmissionData])
        .select()
        .single();

      if (error) {
        console.error('Error creating submission:', error);
        throw error;
      }

      console.log('Submission created successfully:', data);

      // Send notification email directly from frontend
      try {
        console.log('Calling notification function for submission:', data.id);
        const { error: notificationError } = await supabase.functions.invoke('send-notification', {
          body: {
            type: 'submission_created',
            submissionId: data.id
          }
        });

        if (notificationError) {
          console.error('Error sending notification:', notificationError);
          // Don't throw error here - submission was successful, just log the notification issue
        } else {
          console.log('Notification sent successfully');
        }
      } catch (notificationError) {
        console.error('Failed to send notification:', notificationError);
        // Don't throw error here - submission was successful
      }
      
      return data;
    },
    onSuccess: (data) => {
      console.log('Submission mutation completed successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['form-submissions'] });
      toast({
        title: "Project submitted successfully!",
        description: "We'll get back to you within 2 business days. Check your email for confirmation.",
      });
    },
    onError: (error: any) => {
      console.error('Error creating submission:', error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
};
