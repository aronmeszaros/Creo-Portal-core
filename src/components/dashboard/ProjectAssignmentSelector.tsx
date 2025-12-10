
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDesigners } from "@/hooks/useDesigners";

interface ProjectAssignmentSelectorProps {
  currentAssignedDesignerId?: string | null;
  submissionId: string;
  onAssignmentChange: (submissionId: string, designerId: string | null) => void;
  isUpdating?: boolean;
}

export const ProjectAssignmentSelector = ({ 
  currentAssignedDesignerId, 
  submissionId, 
  onAssignmentChange,
  isUpdating = false 
}: ProjectAssignmentSelectorProps) => {
  const { designers } = useDesigners();

  return (
    <Select
      value={currentAssignedDesignerId || "unassigned"}
      onValueChange={(value) => {
        const designerId = value === "unassigned" ? null : value;
        onAssignmentChange(submissionId, designerId);
      }}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Assign designer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">
          <span className="text-gray-500">Unassigned</span>
        </SelectItem>
        {designers.map((designer) => (
          <SelectItem key={designer.id} value={designer.id}>
            <div className="flex flex-col">
              <span>{designer.name}</span>
              {designer.specialization && (
                <span className="text-xs text-gray-500">{designer.specialization}</span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
