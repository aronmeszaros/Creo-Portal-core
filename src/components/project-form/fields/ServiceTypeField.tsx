
import { ProjectFormData } from "@/pages/StartProject";

interface ServiceTypeFieldProps {
  formData: ProjectFormData;
  handleInputChange: (field: keyof ProjectFormData, value: any) => void;
}

export const ServiceTypeField = ({ formData, handleInputChange }: ServiceTypeFieldProps) => {
  const serviceTypes = [
    {
      value: 'consultation',
      title: 'Design Consultation',
      description: 'Expert advice and guidance for your design project'
    },
    {
      value: 'concept',
      title: 'Full Design Concept',
      description: 'Complete design concept with detailed plans and layouts'
    },
    {
      value: 'procurement',
      title: 'Design Concept and Procurement',
      description: 'Full design concept plus sourcing and procurement services'
    }
  ];

  return (
    <div>
      <label className="block text-portal-dark mb-4 font-medium">
        Service Type <span className="text-gray-400">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceTypes.map((service) => (
          <div
            key={service.value}
            className={`relative cursor-pointer border-2 rounded-lg p-6 transition-all duration-200 hover:shadow-md ${
              formData.service_type === service.value
                ? 'border-portal-sage bg-portal-sage/5'
                : 'border-gray-200 hover:border-portal-sage/50'
            }`}
            onClick={() => handleInputChange('service_type', service.value)}
          >
            <input
              type="radio"
              id={`service-${service.value}`}
              name="service-type"
              value={service.value}
              checked={formData.service_type === service.value}
              onChange={(e) => handleInputChange('service_type', e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <h3 className="font-medium text-portal-dark mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
            {formData.service_type === service.value && (
              <div className="absolute top-3 right-3 w-4 h-4 bg-portal-sage rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
