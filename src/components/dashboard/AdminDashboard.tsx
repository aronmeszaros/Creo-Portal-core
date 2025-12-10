
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { useFormSubmissions } from "@/hooks/useFormSubmissions";
import { useDesigners } from "@/hooks/useDesigners";
import { DashboardStats } from "./DashboardStats";
import { SubmissionsManagement } from "./SubmissionsManagement";
import { DesignerManagement } from "./DesignerManagement";
import { UserManagement } from "./UserManagement";

export const AdminDashboard = () => {
  const { submissions } = useFormSubmissions();

  return (
    <div className="space-y-8">
      <DashboardStats submissions={submissions} />
      
      <Tabs defaultValue="submissions" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="designers">
            <Users className="w-4 h-4 mr-2" />
            Designers
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions">
          <SubmissionsManagement />
        </TabsContent>
        
        <TabsContent value="designers">
          <DesignerManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};
