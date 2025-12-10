
import { ProtectedRoute } from "@/components/dashboard/ProtectedRoute";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DesignerDashboard } from "@/components/dashboard/DesignerDashboard";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { isDesigner, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-portal-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-portal-sage/30 border-t-portal-sage rounded-full animate-spin mx-auto mb-4" />
          <p className="text-portal-dark/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      {isDesigner ? <DesignerDashboard /> : <DashboardContent />}
    </ProtectedRoute>
  );
};

export default Dashboard;
