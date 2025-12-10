
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface InspirationFilesGalleryProps {
  files: string[];
}

export const InspirationFilesGallery = ({ files }: InspirationFilesGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!files || files.length === 0) {
    return (
      <div className="text-center py-8 text-portal-dark/60">
        <p>No inspiration files uploaded</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelectedImage(file)}
          >
            <img
              src={file}
              alt={`Inspiration ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        ))}
      </div>

      {/* Image preview modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
            >
              <X className="w-4 h-4" />
            </button>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Inspiration preview"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
