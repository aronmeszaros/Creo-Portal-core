
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubmissionDetailsModal } from "./SubmissionDetailsModal";
import { SubmissionTableRow } from "./submissions/SubmissionTableRow";
import { SubmissionCard } from "./submissions/SubmissionCard";
import { EmptySubmissionsState } from "./submissions/EmptySubmissionsState";
import { LoadingSubmissionsState } from "./submissions/LoadingSubmissionsState";
import { DeleteSubmissionDialog } from "./submissions/DeleteSubmissionDialog";
import { Submission, SubmissionsTableProps } from "./submissions/types";

export const SubmissionsTable = ({ 
  submissions, 
  isLoading, 
  isAdmin = false, 
  onStatusChange,
  onDesignerAssignment,
  onDelete,
  isUpdatingStatus = false,
  isDeleting = false
}: SubmissionsTableProps) => {
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

  if (isLoading) {
    return <LoadingSubmissionsState />;
  }

  if (submissions.length === 0) {
    return <EmptySubmissionsState isAdmin={isAdmin} />;
  }

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="block lg:hidden space-y-4">
        {submissions.map((submission, index) => (
          <div key={submission.id} className="relative">
            <SubmissionCard
              submission={submission}
              isAdmin={isAdmin}
              onStatusChange={onStatusChange}
              onDesignerAssignment={onDesignerAssignment}
              onDelete={isAdmin ? handleDeleteClick : undefined}
              isUpdatingStatus={isUpdatingStatus}
              isDeleting={isDeleting}
              onViewDetails={handleViewDetails}
            />
            {index < submissions.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-4" />
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block border rounded-lg bg-white/90 backdrop-blur-sm">
        <ScrollArea className="h-[600px] w-full">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-gray-200">
                {isAdmin && (
                  <TableHead className="w-52">
                    Client
                  </TableHead>
                )}
                <TableHead className="w-40">Service</TableHead>
                <TableHead className="min-w-96 max-w-lg">Description</TableHead>
                <TableHead className="w-28">Budget</TableHead>
                {isAdmin && (
                  <TableHead className="w-44">Assigned Designer</TableHead>
                )}
                <TableHead className="w-36">Status</TableHead>
                <TableHead className="w-40">Date</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission, index) => (
                <TableRow 
                  key={submission.id} 
                  className={`hover:bg-portal-sage/5 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  } ${index < submissions.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <SubmissionTableRow
                    submission={submission}
                    isAdmin={isAdmin}
                    onStatusChange={onStatusChange}
                    onDesignerAssignment={onDesignerAssignment}
                    onDelete={isAdmin ? handleDeleteClick : undefined}
                    isUpdatingStatus={isUpdatingStatus}
                    isDeleting={isDeleting}
                    onViewDetails={handleViewDetails}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
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
