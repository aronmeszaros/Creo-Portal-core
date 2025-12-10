
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, Clock, CheckCircle } from "lucide-react";

interface DesignerStatsProps {
  submissions: any[];
}

export const DesignerStats = ({ submissions }: DesignerStatsProps) => {
  const newProjects = submissions.filter(s => s.status === 'new').length;
  const inProgressProjects = submissions.filter(s => s.status === 'in-progress').length;
  const completedProjects = submissions.filter(s => s.status === 'completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-portal-sage" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-portal-dark">{submissions.length}</p>
              <p className="text-portal-dark/60">Total Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-portal-dark">{newProjects}</p>
              <p className="text-portal-dark/60">New Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-portal-dark">{inProgressProjects}</p>
              <p className="text-portal-dark/60">In Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-portal-dark">{completedProjects}</p>
              <p className="text-portal-dark/60">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
