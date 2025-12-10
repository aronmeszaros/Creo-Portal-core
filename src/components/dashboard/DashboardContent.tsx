
import { DashboardHeader } from "./DashboardHeader";
import { AdminDashboard } from "./AdminDashboard";
import { ClientDashboard } from "./ClientDashboard";
import { useFormSubmissions } from "@/hooks/useFormSubmissions";

export const DashboardContent = () => {
  const { isAdmin, isLoading } = useFormSubmissions();

  console.log("Dashboard rendering with admin status:", isAdmin);

  if (isLoading) {
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
    <div className="min-h-screen bg-portal-beige">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-light text-portal-dark leading-tight tracking-wider uppercase mb-2 font-cinzel">
            {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </h1>
          <p className="text-portal-dark/70 text-lg">
            {isAdmin ? 'Manage all project submissions and your design team' : 'Manage and track your project submissions'}
          </p>
        </div>

        {isAdmin ? <AdminDashboard /> : <ClientDashboard />}
      </div>
    </div>
  );
};
