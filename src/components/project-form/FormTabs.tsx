
interface Step {
  id: string;
  title: string;
}

interface FormTabsProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export const FormTabs = ({ steps, currentStep, onStepChange }: FormTabsProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-12">
      {steps.map((step, index) => (
        <button
          key={step.id}
          onClick={() => onStepChange(index)}
          className={`px-8 py-4 font-medium transition-all duration-300 border-b-2 tracking-wide ${
            currentStep === index
              ? 'border-portal-dark text-portal-dark font-bold'
              : 'border-transparent text-gray-500 hover:text-portal-dark'
          }`}
        >
          {step.title}
        </button>
      ))}
    </div>
  );
};
