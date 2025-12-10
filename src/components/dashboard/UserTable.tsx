
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Search, Shield, User as UserIcon, Palette } from "lucide-react";
import { UserDeleteModal } from "./UserDeleteModal";
import { User } from "@/hooks/useUsers";

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onDeleteUser: (userId: string) => void;
  isDeleting: boolean;
}

export const UserTable = ({ users, isLoading, onDeleteUser, isDeleting }: UserTableProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id);
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserTypeIcon = (user: User) => {
    if (user.is_admin || user.role === 'admin') {
      return <Shield className="w-4 h-4 text-red-500" />;
    }
    if (user.role === 'designer') {
      return <Palette className="w-4 h-4 text-blue-500" />;
    }
    return <UserIcon className="w-4 h-4 text-green-500" />;
  };

  const getUserTypeBadge = (user: User) => {
    if (user.is_admin || user.role === 'admin') {
      return <Badge variant="destructive">Admin</Badge>;
    }
    if (user.role === 'designer') {
      return <Badge variant="default" className="bg-blue-500">Designer</Badge>;
    }
    return <Badge variant="secondary">Client</Badge>;
  };

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const userType = user.is_admin || user.role === 'admin' ? 'admin' : 
                    user.role === 'designer' ? 'designer' : 'client';
    const matchesRole = roleFilter === 'all' || userType === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-portal-sage/30 border-t-portal-sage rounded-full animate-spin mx-auto mb-4" />
          <p className="text-portal-dark/60">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-portal-dark/40 w-4 h-4" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300 focus:border-portal-sage focus:ring-portal-sage"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-portal-sage focus:ring-portal-sage">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
            <SelectItem value="designer">Designers</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-portal-dark/60">
            {searchTerm || roleFilter !== 'all' ? 'No users match your filters.' : 'No users found.'}
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {getUserTypeIcon(user)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.full_name || 'Not provided'}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {getUserTypeBadge(user)}
                  </TableCell>
                  <TableCell>
                    {formatDate(user.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(user)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <UserDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.full_name || 'Unknown User'}
        userEmail={userToDelete?.email || 'Unknown Email'}
        isDeleting={isDeleting}
      />
    </>
  );
};
