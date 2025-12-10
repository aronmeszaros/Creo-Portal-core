
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptySubmissionsStateProps {
  isAdmin: boolean;
}

export const EmptySubmissionsState = ({ isAdmin }: EmptySubmissionsStateProps) => {
  return (
    <div className="text-center py-8">
      <FileText className="w-12 h-12 text-portal-dark/40 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-portal-dark mb-2">No submissions found</h3>
      <p className="text-portal-dark/60 mb-4">
        {isAdmin ? "No project submissions have been received yet." : "You haven't submitted any project inquiries yet."}
      </p>
      {!isAdmin && (
        <Link to="/start-project">
          <Button className="bg-portal-sage hover:bg-portal-sage/90 text-white font-medium tracking-wider uppercase">
            <Plus className="w-4 h-4 mr-2" />
            Submit Your First Project
          </Button>
        </Link>
      )}
    </div>
  );
};
