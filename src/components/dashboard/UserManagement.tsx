
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { UserTable } from "./UserTable";

export const UserManagement = () => {
  const { users, isLoading, deleteUser } = useUsers();

  const handleDeleteUser = (userId: string) => {
    deleteUser.mutate(userId);
  };

  // Separate users by type
  const adminUsers = users.filter(user => user.is_admin || user.role === 'admin');
  const designerUsers = users.filter(user => user.role === 'designer' && !user.is_admin);
  const clientUsers = users.filter(user => 
    user.role !== 'admin' && user.role !== 'designer' && !user.is_admin
  );

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-portal-sage" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portal-dark">{users.length}</div>
            <p className="text-xs text-portal-dark/60">All user accounts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portal-dark">{adminUsers.length}</div>
            <p className="text-xs text-portal-dark/60">Admin accounts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Designers</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portal-dark">{designerUsers.length}</div>
            <p className="text-xs text-portal-dark/60">Designer accounts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-portal-dark">{clientUsers.length}</div>
            <p className="text-xs text-portal-dark/60">Client accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* All Users Table */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-2xl font-light text-portal-dark tracking-wide font-cinzel">
            All User Accounts
          </CardTitle>
          <CardDescription className="text-portal-dark/60">
            Manage all user accounts including admins, designers, and clients. Use caution when deleting accounts as this action is permanent.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <UserTable
            users={users}
            isLoading={isLoading}
            onDeleteUser={handleDeleteUser}
            isDeleting={deleteUser.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};
