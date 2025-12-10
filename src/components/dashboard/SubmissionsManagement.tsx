
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, Filter, Plus } from "lucide-react";
import { useFormSubmissions } from "@/hooks/useFormSubmissions";
import { useDesigners } from "@/hooks/useDesigners";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { SubmissionCardsGrid } from "./SubmissionCardsGrid";

export const SubmissionsManagement = () => {
  const { submissions, isLoading, updateSubmissionStatus, deleteSubmission, isAdmin } = useFormSubmissions();
  const { designers } = useDesigners();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.service_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (submissionId: string, status: 'new' | 'in-progress' | 'completed') => {
    updateSubmissionStatus.mutate({ submissionId, status });
  };

  const handleDesignerAssignment = async (submissionId: string, designerId: string | null) => {
    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ assigned_designer_id: designerId })
        .eq('id', submissionId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['form-submissions'] });
      
      toast({
        title: "Assignment updated",
        description: designerId 
          ? "Project has been assigned to designer" 
          : "Project assignment has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Assignment failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (submissionId: string) => {
    deleteSubmission.mutate(submissionId);
  };

  return (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-light text-portal-dark tracking-wide font-cinzel">
              {isAdmin ? 'All Submissions' : 'Your Submissions'}
            </CardTitle>
            <CardDescription className="text-portal-dark/60">
              {isAdmin ? 'Manage and update the status of all project inquiries' : 'Track the progress of your project inquiries'}
            </CardDescription>
          </div>
          <Link to="/start-project">
            <Button className="bg-portal-sage hover:bg-portal-sage/90 text-white font-medium tracking-wider uppercase">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-portal-dark/40 w-4 h-4" />
            <Input
              placeholder={isAdmin ? "Search by client name, email, or service..." : "Search submissions..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus:border-portal-sage focus:ring-portal-sage"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-portal-sage focus:ring-portal-sage">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <SubmissionCardsGrid 
          submissions={filteredSubmissions}
          isLoading={isLoading}
          isAdmin={isAdmin}
          onStatusChange={isAdmin ? handleStatusChange : undefined}
          onDesignerAssignment={isAdmin ? handleDesignerAssignment : undefined}
          onDelete={isAdmin ? handleDelete : undefined}
          isUpdatingStatus={updateSubmissionStatus.isPending}
          isDeleting={deleteSubmission.isPending}
        />
      </CardContent>
    </Card>
  );
};
