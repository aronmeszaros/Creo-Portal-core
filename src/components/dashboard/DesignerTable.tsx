
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Mail, Trash2, Users, Key } from "lucide-react";
import { PasswordViewModal } from "./PasswordViewModal";

interface Designer {
  id: string;
  name: string;
  email: string | null;
  specialization: string | null;
  description: string | null;
  avatar_url: string | null;
  years_experience: number | null;
  portfolio_images: string[] | null;
  created_at: string;
  updated_at: string;
}

interface DesignerTableProps {
  designers: Designer[];
  onEdit: (designer: Designer) => void;
  onDelete: (designerId: string) => void;
  getDesignerPassword: (designerId: string) => any;
}

export const DesignerTable = ({ designers, onEdit, onDelete, getDesignerPassword }: DesignerTableProps) => {
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [selectedDesigner, setSelectedDesigner] = useState<Designer | null>(null);

  const handleViewPassword = (designer: Designer) => {
    setSelectedDesigner(designer);
    setPasswordModalOpen(true);
  };

  const selectedPassword = selectedDesigner ? getDesignerPassword(selectedDesigner.id) : null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Designers</CardTitle>
          <CardDescription>Manage your design team and their account access</CardDescription>
        </CardHeader>
        <CardContent>
          {designers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-portal-dark/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-portal-dark mb-2">No designers yet</h3>
              <p className="text-portal-dark/60 mb-4">
                Add your first designer to start assigning projects.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {designers.map((designer) => {
                  const hasPassword = getDesignerPassword(designer.id);
                  
                  return (
                    <TableRow key={designer.id}>
                      <TableCell className="font-medium">{designer.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-portal-dark/40" />
                          {designer.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        {designer.specialization ? (
                          <Badge variant="secondary">{designer.specialization}</Badge>
                        ) : (
                          <span className="text-portal-dark/40">Not specified</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {designer.years_experience ? (
                          `${designer.years_experience} years`
                        ) : (
                          <span className="text-portal-dark/40">Not specified</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {hasPassword && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewPassword(designer)}
                              title="View Password"
                            >
                              <Key className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(designer)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(designer.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Password View Modal */}
      {selectedDesigner && selectedPassword && (
        <PasswordViewModal
          isOpen={passwordModalOpen}
          onClose={() => {
            setPasswordModalOpen(false);
            setSelectedDesigner(null);
          }}
          designerName={selectedDesigner.name}
          password={selectedPassword.password}
          createdAt={selectedPassword.created_at}
          isUsed={selectedPassword.is_used}
        />
      )}
    </>
  );
};
