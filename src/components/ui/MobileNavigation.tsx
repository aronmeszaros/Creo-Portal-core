
import { X } from "lucide-react";
import { ReactNode } from "react";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const MobileNavigation = ({ isOpen, onClose, children }: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header with X button - no animation here */}
      <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200">
        <img 
          src="/lovable-uploads/561a35d9-ac29-4804-b76e-c08fc3f916c3.png" 
          alt="Portal by CreoDesigns" 
          className="h-12 w-auto"
        />
        {/* X button positioned to compensate for missing scrollbar and align with hamburger menu */}
        <button 
          onClick={onClose}
          className="p-2 text-portal-dark hover:text-portal-sage transition-colors"
          style={{ marginRight: '8px' }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Content with fade animation - only content animates */}
      <div className="flex flex-col items-start justify-center h-[calc(100vh-4rem)] px-8 space-y-8 animate-fade-in">
        {children}
      </div>
    </div>
  );
};
