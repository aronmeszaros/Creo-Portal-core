
import { useCreateSubmission } from "./mutations/useCreateSubmission";
import { useUpdateSubmissionStatus } from "./mutations/useUpdateSubmissionStatus";
import { useDeleteSubmission } from "./mutations/useDeleteSubmission";
import { useSubmissions } from "./queries/useSubmissions";
import { useAuth } from "./useAuth";

export const useFormSubmissions = () => {
  const { isAdmin, isDesigner } = useAuth();
  const { data: submissions, isLoading } = useSubmissions();
  const createSubmission = useCreateSubmission();
  const updateSubmissionStatus = useUpdateSubmissionStatus();
  const deleteSubmission = useDeleteSubmission();

  return {
    submissions: submissions || [],
    isLoading,
    createSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    isAdmin,
    isDesigner,
  };
};
