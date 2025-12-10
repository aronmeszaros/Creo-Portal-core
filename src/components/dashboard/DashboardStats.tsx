
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, Clock, CheckCircle } from "lucide-react";

interface DashboardStatsProps {
  submissions: any[];
}

export const DashboardStats = ({ submissions }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-portal-dark/60 tracking-wider uppercase">Total Submissions</p>
              <p className="text-3xl font-light text-portal-dark">{submissions.length}</p>
            </div>
            <div className="w-10 h-10 bg-portal-sage/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-portal-sage" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-portal-dark/60 tracking-wider uppercase">New</p>
              <p className="text-3xl font-light text-blue-600">
                {submissions.filter(s => s.status === 'new').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-portal-dark/60 tracking-wider uppercase">In Progress</p>
              <p className="text-3xl font-light text-yellow-600">
                {submissions.filter(s => s.status === 'in-progress').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-green-100 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-portal-dark/60 tracking-wider uppercase">Completed</p>
              <p className="text-3xl font-light text-green-600">
                {submissions.filter(s => s.status === 'completed').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
