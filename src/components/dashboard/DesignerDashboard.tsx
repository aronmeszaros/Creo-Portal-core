
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFormSubmissions } from "@/hooks/useFormSubmissions";
import { DashboardHeader } from "./DashboardHeader";
import { DesignerStats } from "./DesignerStats";
import { DesignerProjectsTable } from "./DesignerProjectsTable";
import { SubmissionDetailsModal } from "./SubmissionDetailsModal";
import { Submission } from "./submissions/types";

export const DesignerDashboard = () => {
  const { user } = useAuth();
  const { submissions, isLoading } = useFormSubmissions();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("Designer Dashboard - User:", user?.email);
  console.log("Designer Dashboard - Submissions:", submissions);
  console.log("Designer Dashboard - Is Loading:", isLoading);

  const handleViewDetails = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-portal-beige">
        <DashboardHeader />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-portal-sage/30 border-t-portal-sage rounded-full animate-spin mx-auto mb-4" />
            <p className="text-portal-dark/60">Loading your projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-portal-beige">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-light text-portal-dark leading-tight tracking-wider uppercase mb-2 font-cinzel">
            Designer Dashboard
          </h1>
          <p className="text-portal-dark/70 text-lg">
            Welcome back! Here are your assigned projects.
          </p>
        </div>

        {/* Stats */}
        <DesignerStats submissions={submissions} />

        {/* Projects Table */}
        <DesignerProjectsTable 
          submissions={submissions} 
          onViewDetails={handleViewDetails}
        />

        {/* Details Modal */}
        <SubmissionDetailsModal
          submission={selectedSubmission}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};
