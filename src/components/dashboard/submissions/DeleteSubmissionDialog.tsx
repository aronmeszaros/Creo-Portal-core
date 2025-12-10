
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Submission } from "./types";

interface DeleteSubmissionDialogProps {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteSubmissionDialog = ({
  submission,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}: DeleteSubmissionDialogProps) => {
  if (!submission) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Submission</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Are you sure you want to delete this submission? This action cannot be undone.</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
              <p><strong>Client:</strong> {submission.full_name}</p>
              <p><strong>Email:</strong> {submission.email}</p>
              <p><strong>Service:</strong> {submission.service_type}</p>
              <p><strong>Created:</strong> {new Date(submission.created_at).toLocaleDateString()}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Deleting..." : "Delete Submission"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
