
interface StyleDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const StyleDescriptionField = ({ value, onChange }: StyleDescriptionFieldProps) => {
  return (
    <div>
      <label className="block text-portal-dark mb-2 font-medium">
        Describe Your Style Vision
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full px-0 py-4 border-0 border-b border-gray-300 bg-transparent focus:border-portal-dark focus:ring-0 outline-none text-lg resize-none"
        placeholder="Tell us more about your vision, color preferences, specific elements you love, or anything that inspires you..."
      />
    </div>
  );
};
