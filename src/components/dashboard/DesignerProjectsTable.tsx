
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, Clock, CheckCircle, AlertCircle, MapPin, User, Mail, Phone, Eye } from "lucide-react";
import { Submission } from "./submissions/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface DesignerProjectsTableProps {
  submissions: Submission[];
  onViewDetails: (submission: Submission) => void;
}

export const DesignerProjectsTable = ({ submissions, onViewDetails }: DesignerProjectsTableProps) => {
  const isMobile = useIsMobile();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <AlertCircle className="w-3 h-3 mr-1" />
          New
        </Badge>;
      case 'in-progress':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <Clock className="w-3 h-3 mr-1" />
          In Progress
        </Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const MobileProjectCard = ({ submission }: { submission: Submission }) => (
    <Card className="mb-4 border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-medium text-portal-dark mb-1">
              {submission.project_name || 'Untitled Project'}
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              {submission.service_type}
            </Badge>
          </div>
          <div className="ml-2">
            {getStatusBadge(submission.status)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Description */}
          <p className="text-sm text-portal-dark/70 line-clamp-3">
            {submission.description}
          </p>
          
          {/* Project Address */}
          {submission.project_address && (
            <div className="flex items-center text-xs text-portal-dark/60">
              <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{submission.project_address}</span>
            </div>
          )}
          
          {/* Client Info */}
          <div className="space-y-1">
            <div className="flex items-center text-sm text-portal-dark">
              <User className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="font-medium">{submission.full_name}</span>
            </div>
            <div className="flex items-center text-xs text-portal-dark/60">
              <Mail className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="truncate">{submission.email}</span>
            </div>
            {submission.phone && (
              <div className="flex items-center text-xs text-portal-dark/60">
                <Phone className="w-3 h-3 mr-2 flex-shrink-0" />
                <span>{submission.phone}</span>
              </div>
            )}
          </div>
          
          {/* Date and Action */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex items-center text-xs text-portal-dark/60">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(submission.created_at)}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-portal-dark hover:text-portal-sage hover:bg-portal-sage/10 h-8 px-3"
              onClick={() => onViewDetails(submission)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-2xl font-light text-portal-dark tracking-wide font-cinzel">
          Your Assigned Projects
        </CardTitle>
        <CardDescription className="text-portal-dark/60">
          Manage and track the progress of your assigned design projects
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {submissions.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-portal-dark/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-portal-dark mb-2">No projects assigned</h3>
            <p className="text-portal-dark/60">
              You don't have any assigned projects yet. Check back later or contact your admin.
            </p>
          </div>
        ) : (
          <>
            {isMobile ? (
              /* Mobile Card Layout */
              <div className="space-y-0">
                {submissions.map((submission) => (
                  <MobileProjectCard 
                    key={submission.id} 
                    submission={submission} 
                  />
                ))}
              </div>
            ) : (
              /* Desktop Table Layout */
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Details</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Assigned</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow 
                        key={submission.id} 
                        className="hover:bg-portal-sage/5 cursor-pointer"
                      >
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-portal-dark">
                              {submission.project_name || 'Untitled Project'}
                            </p>
                            <p className="text-sm text-portal-dark/70 line-clamp-2">
                              {submission.description}
                            </p>
                            {submission.project_address && (
                              <p className="text-xs text-portal-dark/60 flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {submission.project_address}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-portal-dark flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {submission.full_name}
                            </p>
                            <p className="text-xs text-portal-dark/60 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {submission.email}
                            </p>
                            {submission.phone && (
                              <p className="text-xs text-portal-dark/60 flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {submission.phone}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{submission.service_type}</Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(submission.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-portal-dark/60">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(submission.created_at)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-portal-dark hover:text-portal-sage hover:bg-portal-sage/10 p-2"
                            onClick={() => onViewDetails(submission)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
