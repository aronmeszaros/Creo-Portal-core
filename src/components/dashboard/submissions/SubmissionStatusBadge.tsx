
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

interface SubmissionStatusBadgeProps {
  status: string;
}

export const SubmissionStatusBadge = ({ status }: SubmissionStatusBadgeProps) => {
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
