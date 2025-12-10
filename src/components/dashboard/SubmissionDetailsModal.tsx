
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Mail, Phone, MapPin, Palette, FileText, DollarSign, Image } from "lucide-react";
import { useDesigners } from "@/hooks/useDesigners";
import { InspirationFilesGallery } from "./submissions/InspirationFilesGallery";

interface Submission {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  service_type: string;
  description: string;
  budget: string;
  status: 'new' | 'in-progress' | 'completed';
  created_at: string;
  updated_at: string;
  project_name?: string;
  project_type?: string;
  start_date?: string;
  end_date?: string;
  project_address?: string;
  size?: number;
  preferred_designer?: string;
  preferred_style?: string;
  style_description?: string;
  inspiration_files?: string[];
  assigned_designer_id?: string | null;
}

interface SubmissionDetailsModalProps {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionDetailsModal = ({ submission, isOpen, onClose }: SubmissionDetailsModalProps) => {
  const { designers } = useDesigners();

  if (!submission) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'new': { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800' },
      'in-progress': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'completed': { variant: 'secondary' as const, className: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { variant: 'secondary' as const, className: '' };
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </Badge>
    );
  };

  const getAssignedDesignerName = () => {
    if (!submission.assigned_designer_id) return null;
    const designer = designers.find(d => d.id === submission.assigned_designer_id);
    return designer?.name || 'Designer not found';
  };

  const getPreferredDesignerName = () => {
    if (!submission.preferred_designer) return null;
    const designer = designers.find(d => d.id === submission.preferred_designer);
    return designer?.name || submission.preferred_designer;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-portal-dark">
            {submission.project_name || 'Project Submission'} Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-portal-dark flex items-center">
                <User className="w-4 h-4 mr-2" />
                Client Information
              </h3>
              <div className="pl-6 space-y-1">
                <p className="text-portal-dark">{submission.full_name}</p>
                <p className="text-portal-dark/70 flex items-center">
                  <Mail className="w-3 h-3 mr-1" />
                  {submission.email}
                </p>
                {submission.phone && (
                  <p className="text-portal-dark/70 flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    {submission.phone}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-portal-dark">Status & Dates</h3>
              <div className="pl-6 space-y-2">
                {getStatusBadge(submission.status)}
                <p className="text-sm text-portal-dark/70 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Created: {formatDate(submission.created_at)}
                </p>
                <p className="text-sm text-portal-dark/70 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Updated: {formatDate(submission.updated_at)}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-portal-dark text-lg">Project Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submission.project_name && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70">Project Name</p>
                  <p className="text-portal-dark">{submission.project_name}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-portal-dark/70">Service Type</p>
                <p className="text-portal-dark">{submission.service_type}</p>
              </div>

              {submission.project_type && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70">Project Type</p>
                  <p className="text-portal-dark">{submission.project_type}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-portal-dark/70 flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Budget
                </p>
                <p className="text-portal-dark">{submission.budget}</p>
              </div>

              {submission.project_address && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    Project Address
                  </p>
                  <p className="text-portal-dark">{submission.project_address}</p>
                </div>
              )}

              {submission.size && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70">Size</p>
                  <p className="text-portal-dark">{submission.size} sq ft</p>
                </div>
              )}

              {submission.start_date && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70">Start Date</p>
                  <p className="text-portal-dark">{new Date(submission.start_date).toLocaleDateString()}</p>
                </div>
              )}

              {submission.end_date && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70">End Date</p>
                  <p className="text-portal-dark">{new Date(submission.end_date).toLocaleDateString()}</p>
                </div>
              )}

              {getAssignedDesignerName() && (
                <div>
                  <p className="text-sm font-medium text-portal-dark/70">Assigned Designer</p>
                  <p className="text-portal-dark">{getAssignedDesignerName()}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Design Preferences */}
          {(submission.preferred_designer || submission.preferred_style || submission.style_description) && (
            <div className="space-y-4">
              <h3 className="font-medium text-portal-dark text-lg flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Design Preferences
              </h3>
              <div className="space-y-3">
                {submission.preferred_designer && (
                  <div>
                    <p className="text-sm font-medium text-portal-dark/70">Preferred Designer</p>
                    <p className="text-portal-dark">{getPreferredDesignerName()}</p>
                  </div>
                )}
                
                {submission.preferred_style && (
                  <div>
                    <p className="text-sm font-medium text-portal-dark/70">Preferred Style</p>
                    <p className="text-portal-dark">{submission.preferred_style}</p>
                  </div>
                )}
                
                {submission.style_description && (
                  <div>
                    <p className="text-sm font-medium text-portal-dark/70">Style Description</p>
                    <p className="text-portal-dark whitespace-pre-wrap">{submission.style_description}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Inspiration Files */}
          {submission.inspiration_files && submission.inspiration_files.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-portal-dark text-lg flex items-center">
                  <Image className="w-4 h-4 mr-2" />
                  Inspiration Files
                </h3>
                <InspirationFilesGallery files={submission.inspiration_files} />
              </div>
            </>
          )}

          {submission.description && (
            <>
              <Separator />
              <div className="space-y-2">
                <h3 className="font-medium text-portal-dark text-lg flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Project Description
                </h3>
                <p className="text-portal-dark whitespace-pre-wrap">{submission.description}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
