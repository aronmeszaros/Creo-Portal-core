
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PasswordViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  designerName: string;
  password: string;
  createdAt: string;
  isUsed?: boolean;
}

export const PasswordViewModal = ({ 
  isOpen, 
  onClose, 
  designerName, 
  password, 
  createdAt,
  isUsed = false 
}: PasswordViewModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Password copied!",
      description: "The designer password has been copied to your clipboard.",
    });
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Designer Password
            {isUsed && <Badge variant="secondary">Used</Badge>}
          </DialogTitle>
          <DialogDescription>
            Temporary login password for {designerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Security Warning */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Security Notice</p>
              <p>Share this password securely and ask the designer to change it immediately after first login.</p>
            </div>
          </div>

          {/* Password Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-portal-dark">
              Temporary Password
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-gray-50 border rounded-md font-mono text-sm">
                {showPassword ? password : '••••••••••••••••'}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Metadata */}
          <div className="text-sm text-portal-dark/60">
            <p>Created: {formatDate(createdAt)}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
