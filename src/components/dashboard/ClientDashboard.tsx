
import { DashboardStats } from "./DashboardStats";
import { SubmissionsManagement } from "./SubmissionsManagement";
import { useFormSubmissions } from "@/hooks/useFormSubmissions";

export const ClientDashboard = () => {
  const { submissions } = useFormSubmissions();

  return (
    <div className="space-y-8">
      <DashboardStats submissions={submissions} />
      <SubmissionsManagement />
    </div>
  );
};
