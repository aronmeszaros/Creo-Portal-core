
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, User, Trash } from "lucide-react";
import { AdminStatusSelector } from "../AdminStatusSelector";
import { ProjectAssignmentSelector } from "../ProjectAssignmentSelector";
import { SubmissionStatusBadge } from "./SubmissionStatusBadge";
import { Submission } from "./types";

interface SubmissionTableRowProps {
  submission: Submission;
  isAdmin: boolean;
  onStatusChange?: (submissionId: string, status: 'new' | 'in-progress' | 'completed') => void;
  onDesignerAssignment?: (submissionId: string, designerId: string | null) => void;
  onDelete?: (submissionId: string) => void;
  isUpdatingStatus: boolean;
  isDeleting?: boolean;
  onViewDetails: (submission: Submission) => void;
}

export const SubmissionTableRow = ({
  submission,
  isAdmin,
  onStatusChange,
  onDesignerAssignment,
  onDelete,
  isUpdatingStatus,
  isDeleting,
  onViewDetails
}: SubmissionTableRowProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      {isAdmin && (
        <TableCell className="font-medium">
          <div className="space-y-1">
            <p className="font-medium text-portal-dark text-sm">
              {submission.full_name}
            </p>
            <p className="text-xs text-portal-dark/60 break-all">
              {submission.email}
            </p>
          </div>
        </TableCell>
      )}
      <TableCell className="font-medium text-portal-dark text-sm">
        {submission.service_type}
      </TableCell>
      <TableCell>
        <p className="text-portal-dark/80 text-sm break-words leading-relaxed">
          {truncateText(submission.description)}
        </p>
      </TableCell>
      <TableCell className="text-portal-dark/80 text-sm">
        {submission.budget}
      </TableCell>
      {isAdmin && (
        <TableCell>
          {onDesignerAssignment ? (
            <ProjectAssignmentSelector
              currentAssignedDesignerId={submission.assigned_designer_id}
              submissionId={submission.id}
              onAssignmentChange={onDesignerAssignment}
              isUpdating={isUpdatingStatus}
            />
          ) : (
            <div className="flex items-center text-portal-dark/60 text-sm">
              <User className="w-4 h-4 mr-2" />
              {submission.assigned_designer_id ? "Assigned" : "Unassigned"}
            </div>
          )}
        </TableCell>
      )}
      <TableCell>
        {isAdmin && onStatusChange ? (
          <AdminStatusSelector
            currentStatus={submission.status}
            submissionId={submission.id}
            onStatusChange={onStatusChange}
            isUpdating={isUpdatingStatus}
          />
        ) : (
          <SubmissionStatusBadge status={submission.status} />
        )}
      </TableCell>
      <TableCell className="text-portal-dark/60 text-sm">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(submission.created_at)}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-portal-dark hover:text-portal-sage hover:bg-portal-sage/10 p-2"
            onClick={() => onViewDetails(submission)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          {isAdmin && onDelete && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
              onClick={() => onDelete(submission.id)}
              disabled={isDeleting}
            >
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </>
  );
};
