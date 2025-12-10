
import { useAuth } from "@/hooks/useAuth";

interface DesignerDebugInfoProps {
  submissions: any[];
  isLoading: boolean;
}

export const DesignerDebugInfo = ({ submissions, isLoading }: DesignerDebugInfoProps) => {
  const { user, isDesigner, isAdmin } = useAuth();

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded-lg text-sm">
      <p><strong>Debug Info:</strong></p>
      <p>User: {user?.email}</p>
      <p>User ID: {user?.id}</p>
      <p>Is Designer: {isDesigner ? 'Yes' : 'No'}</p>
      <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
      <p>Submissions Count: {submissions.length}</p>
      <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
      {isDesigner && submissions.length === 0 && !isLoading && (
        <p className="text-orange-600 mt-2">
          <strong>Note:</strong> No assigned projects found. Check if this designer account exists in the designer_accounts table.
        </p>
      )}
    </div>
  );
};
