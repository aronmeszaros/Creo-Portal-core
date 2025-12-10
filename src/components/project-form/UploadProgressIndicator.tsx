
interface UploadProgressIndicatorProps {
  uploadProgress: { completed: number; total: number } | null;
}

export const UploadProgressIndicator = ({ uploadProgress }: UploadProgressIndicatorProps) => {
  if (!uploadProgress) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600 mb-2">
        Uploading files: {uploadProgress.completed}/{uploadProgress.total}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-portal-sage h-2 rounded-full transition-all duration-300"
          style={{ width: `${(uploadProgress.completed / uploadProgress.total) * 100}%` }}
        />
      </div>
    </div>
  );
};
