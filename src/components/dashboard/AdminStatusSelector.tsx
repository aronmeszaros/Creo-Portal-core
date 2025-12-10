
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, CheckCircle } from "lucide-react";

interface AdminStatusSelectorProps {
  currentStatus: 'new' | 'in-progress' | 'completed';
  submissionId: string;
  onStatusChange: (submissionId: string, status: 'new' | 'in-progress' | 'completed') => void;
  isUpdating?: boolean;
}

export const AdminStatusSelector = ({ 
  currentStatus, 
  submissionId, 
  onStatusChange, 
  isUpdating = false 
}: AdminStatusSelectorProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <div className="flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            New
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </div>
        );
      default:
        return status;
    }
  };

  return (
    <Select
      value={currentStatus}
      onValueChange={(value: 'new' | 'in-progress' | 'completed') => 
        onStatusChange(submissionId, value)
      }
      disabled={isUpdating}
    >
      <SelectTrigger className="w-[140px] h-8">
        <SelectValue>
          <Badge 
            variant="secondary" 
            className={`
              ${currentStatus === 'new' ? 'bg-blue-100 text-blue-800' : ''}
              ${currentStatus === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${currentStatus === 'completed' ? 'bg-green-100 text-green-800' : ''}
            `}
          >
            {getStatusBadge(currentStatus)}
          </Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            New
          </Badge>
        </SelectItem>
        <SelectItem value="in-progress">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        </SelectItem>
        <SelectItem value="completed">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
