
export interface Submission {
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

export interface SubmissionsTableProps {
  submissions: Submission[];
  isLoading: boolean;
  isAdmin?: boolean;
  onStatusChange?: (submissionId: string, status: 'new' | 'in-progress' | 'completed') => void;
  onDesignerAssignment?: (submissionId: string, designerId: string | null) => void;
  onDelete?: (submissionId: string) => void;
  isUpdatingStatus?: boolean;
  isDeleting?: boolean;
}
