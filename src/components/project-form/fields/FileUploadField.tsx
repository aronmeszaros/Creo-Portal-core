
import { ProjectFormData } from "@/pages/StartProject";

interface FileUploadFieldProps {
  formData: ProjectFormData;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
}

export const FileUploadField = ({ formData, handleFileChange, removeFile }: FileUploadFieldProps) => {
  return (
    <div>
      <label className="block text-portal-dark mb-2 font-medium">
        Upload Inspiration Images
      </label>
      <div className="border border-gray-300 p-8 text-center cursor-pointer hover:border-portal-dark transition-colors">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="text-gray-600">Drag and drop files here or click to browse</p>
          <p className="text-sm text-gray-500 mt-2">Only image files are allowed</p>
        </label>
      </div>
      
      {/* File List */}
      {formData.inspiration_files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            Selected files ({formData.inspiration_files.length}):
          </p>
          <ul className="space-y-2">
            {formData.inspiration_files.map((file, index) => (
              <li key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-portal-dark">{file.name}</span>
                  <span className="text-sm text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-portal-dark transition-colors"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
