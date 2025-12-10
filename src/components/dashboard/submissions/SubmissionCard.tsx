
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, User, Trash, DollarSign } from "lucide-react";
import { AdminStatusSelector } from "../AdminStatusSelector";
import { ProjectAssignmentSelector } from "../ProjectAssignmentSelector";
import { SubmissionStatusBadge } from "./SubmissionStatusBadge";
import { Submission } from "./types";

interface SubmissionCardProps {
  submission: Submission;
  isAdmin: boolean;
  onStatusChange?: (submissionId: string, status: 'new' | 'in-progress' | 'completed') => void;
  onDesignerAssignment?: (submissionId: string, designerId: string | null) => void;
  onDelete?: (submissionId: string) => void;
  isUpdatingStatus: boolean;
  isDeleting?: boolean;
  onViewDetails: (submission: Submission) => void;
}

export const SubmissionCard = ({
  submission,
  isAdmin,
  onStatusChange,
  onDesignerAssignment,
  onDelete,
  isUpdatingStatus,
  isDeleting,
  onViewDetails
}: SubmissionCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="border border-gray-200 hover:border-portal-sage/30 transition-colors bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4 space-y-4">
        {/* Header with client info and actions */}
        <div className="flex justify-between items-start">
          <div className="space-y-1 flex-1">
            {isAdmin && (
              <div className="space-y-1">
                <p className="font-semibold text-portal-dark">{submission.full_name}</p>
                <p className="text-sm text-portal-dark/60 break-all">{submission.email}</p>
              </div>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {submission.service_type}
              </Badge>
              <div className="flex items-center text-sm text-portal-dark/60">
                <DollarSign className="w-3 h-3 mr-1" />
                {submission.budget}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
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
        </div>

        {/* Description */}
        <div>
          <p className="text-portal-dark/80 text-sm leading-relaxed">
            {submission.description}
          </p>
        </div>

        {/* Status and Assignment */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-portal-dark/60 uppercase tracking-wide mb-1 block">
              Status
            </label>
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
          </div>

          {isAdmin && (
            <div>
              <label className="text-xs font-medium text-portal-dark/60 uppercase tracking-wide mb-1 block">
                Assigned Designer
              </label>
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
            </div>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center text-xs text-portal-dark/60 pt-2 border-t border-gray-100">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Submitted {formatDate(submission.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
