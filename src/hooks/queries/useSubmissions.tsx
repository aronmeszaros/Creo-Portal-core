
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FormSubmission } from "@/types/submission";

export const useSubmissions = () => {
  const { user, isAdmin, isDesigner } = useAuth();

  return useQuery({
    queryKey: ['form-submissions', user?.id, isAdmin, isDesigner],
    queryFn: async () => {
      if (!user) {
        console.log("useSubmissions: No user found");
        return [];
      }
      
      console.log("useSubmissions: User ID:", user.id);
      console.log("useSubmissions: isAdmin:", isAdmin);
      console.log("useSubmissions: isDesigner:", isDesigner);
      
      let query = supabase.from('form_submissions').select('*');
      
      // Different queries based on user role
      if (isAdmin) {
        console.log("useSubmissions: Fetching as admin");
        // Admins can see all submissions
        query = query.order('created_at', { ascending: false });
      } else if (isDesigner) {
        console.log("useSubmissions: Fetching as designer");
        // Designers can only see their assigned projects
        try {
          const { data: designerAccount, error: designerError } = await supabase
            .from('designer_accounts')
            .select('designer_id')
            .eq('user_id', user.id)
            .maybeSingle(); // Use maybeSingle instead of single to handle no results gracefully
          
          console.log("useSubmissions: Designer account lookup:", { designerAccount, designerError });
          
          if (designerError) {
            console.error("useSubmissions: Error fetching designer account:", designerError);
            throw designerError;
          }
          
          if (designerAccount) {
            console.log("useSubmissions: Found designer account with ID:", designerAccount.designer_id);
            query = query
              .eq('assigned_designer_id', designerAccount.designer_id)
              .order('created_at', { ascending: false });
          } else {
            console.log("useSubmissions: No designer account found for user - returning empty array");
            return []; // Designer not found in accounts
          }
        } catch (error) {
          console.error("useSubmissions: Failed to fetch designer account:", error);
          return []; // Return empty array on error to prevent crashes
        }
      } else {
        console.log("useSubmissions: Fetching as regular user");
        // Regular users see only their own submissions
        query = query
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
      }
      
      const { data, error } = await query;

      if (error) {
        console.error('useSubmissions: Error fetching submissions:', error);
        throw error;
      }

      console.log("useSubmissions: Final data:", data);
      return data as FormSubmission[];
    },
    enabled: !!user,
  });
};
