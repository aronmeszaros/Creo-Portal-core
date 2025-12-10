
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, User, Mail, Phone, MapPin, DollarSign, Trash2, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { AdminStatusSelector } from "./AdminStatusSelector";
import { ProjectAssignmentSelector } from "./ProjectAssignmentSelector";
import { SubmissionDetailsModal } from "./SubmissionDetailsModal";
import { DeleteSubmissionDialog } from "./submissions/DeleteSubmissionDialog";
import { Submission } from "./submissions/types";

interface SubmissionCardsGridProps {
  submissions: Submission[];
  isLoading: boolean;
  isAdmin?: boolean;
  onStatusChange?: (submissionId: string, status: 'new' | 'in-progress' | 'completed') => void;
  onDesignerAssignment?: (submissionId: string, designerId: string | null) => void;
  onDelete?: (submissionId: string) => void;
  isUpdatingStatus?: boolean;
  isDeleting?: boolean;
}

export const SubmissionCardsGrid = ({
  submissions,
  isLoading,
  isAdmin = false,
  onStatusChange,
  onDesignerAssignment,
  onDelete,
  isUpdatingStatus = false,
  isDeleting = false
}: SubmissionCardsGridProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<Submission | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleDeleteClick = (submissionId: string) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission) {
      setSubmissionToDelete(submission);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (submissionToDelete && onDelete) {
      onDelete(submissionToDelete.id);
      setIsDeleteDialogOpen(false);
      setSubmissionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSubmissionToDelete(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            New
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-portal-dark mb-2">No submissions found</h3>
        <p className="text-portal-dark/60">
          {isAdmin ? "No project submissions have been received yet." : "You haven't submitted any project requests yet."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
          <Card key={submission.id} className="border border-gray-200 hover:border-portal-sage/30 transition-all duration-200 hover:shadow-md bg-white/90 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-medium">
                    {submission.service_type}
                  </Badge>
                  {getStatusBadge(submission.status)}
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-portal-dark hover:text-portal-sage hover:bg-portal-sage/10 h-8 w-8 p-0"
                    onClick={() => handleViewDetails(submission)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {isAdmin && onDelete && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      onClick={() => handleDeleteClick(submission.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {isAdmin && (
                <div className="space-y-1">
                  <div className="flex items-center text-sm font-medium text-portal-dark">
                    <User className="w-4 h-4 mr-2 text-portal-dark/60" />
                    {submission.full_name}
                  </div>
                  <div className="flex items-center text-xs text-portal-dark/60">
                    <Mail className="w-3 h-3 mr-2" />
                    <span className="truncate">{submission.email}</span>
                  </div>
                  {submission.phone && (
                    <div className="flex items-center text-xs text-portal-dark/60">
                      <Phone className="w-3 h-3 mr-2" />
                      {submission.phone}
                    </div>
                  )}
                </div>
              )}
            </CardHeader>
            
            <CardContent className="pt-0 space-y-4">
              {/* Project Details */}
              <div className="space-y-2">
                {submission.project_name && (
                  <h4 className="font-medium text-portal-dark text-sm">
                    {submission.project_name}
                  </h4>
                )}
                <p className="text-portal-dark/80 text-sm leading-relaxed line-clamp-3">
                  {submission.description}
                </p>
                {submission.project_address && (
                  <div className="flex items-center text-xs text-portal-dark/60">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{submission.project_address}</span>
                  </div>
                )}
              </div>

              {/* Budget */}
              <div className="flex items-center text-sm text-portal-dark/70">
                <DollarSign className="w-4 h-4 mr-1" />
                <span className="font-medium">{submission.budget}</span>
              </div>

              {/* Admin Controls */}
              {isAdmin && (
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div>
                    <label className="text-xs font-medium text-portal-dark/60 uppercase tracking-wide mb-1 block">
                      Status
                    </label>
                    {onStatusChange ? (
                      <AdminStatusSelector
                        currentStatus={submission.status}
                        submissionId={submission.id}
                        onStatusChange={onStatusChange}
                        isUpdating={isUpdatingStatus}
                      />
                    ) : (
                      getStatusBadge(submission.status)
                    )}
                  </div>

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
                </div>
              )}

              {/* Date */}
              <div className="flex items-center text-xs text-portal-dark/60 pt-2 border-t border-gray-100">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Submitted {formatDate(submission.created_at)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SubmissionDetailsModal
        submission={selectedSubmission}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <DeleteSubmissionDialog
        submission={submissionToDelete}
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
};
