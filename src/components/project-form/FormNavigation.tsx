
interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onNext: () => void;
}

export const FormNavigation = ({ currentStep, totalSteps, isSubmitting, onNext }: FormNavigationProps) => {
  return (
    <div className="flex justify-start">
      <button
        onClick={onNext}
        disabled={isSubmitting}
        className="bg-white text-portal-dark border border-gray-300 px-8 py-3 hover:bg-portal-dark hover:text-white transition-all duration-300 font-medium tracking-wider uppercase disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : currentStep === totalSteps - 1 ? 'Send' : 'Next'}
      </button>
    </div>
  );
};
