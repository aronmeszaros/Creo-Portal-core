
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-portal-beige">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/561a35d9-ac29-4804-b76e-c08fc3f916c3.png" 
                alt="Portal by CreoDesigns" 
                className="h-12 w-auto"
              />
            </Link>
            <Link to="/register">
              <Button variant="outline" size="sm" className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white">
                Back to Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link to="/register" className="inline-flex items-center text-portal-sage hover:text-portal-sage/80 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign Up
            </Link>
            <h1 className="text-3xl font-bold text-portal-dark font-cinzel mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, submit a project inquiry, or contact us. This may include:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Name and contact information</li>
                <li>Project details and requirements</li>
                <li>Communication preferences</li>
                <li>Payment information (processed securely by third-party providers)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Provide and improve our design services</li>
                <li>Process your project inquiries and match you with designers</li>
                <li>Communicate with you about your projects and our services</li>
                <li>Send you updates and marketing communications (with your consent)</li>
                <li>Ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>To our trusted service providers who assist in operating our platform</li>
                <li>To designers assigned to your projects (limited to project-relevant information)</li>
                <li>When required by law or to protect our rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">6. Cookies and Tracking</h2>
              <p>We use cookies and similar technologies to enhance your experience on our platform. For more information, please see our <Link to="/cookies" className="text-portal-sage hover:underline">Cookies Policy</Link>.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <div className="mt-2">
                <p>Email: portal@creodesigns.com</p>
                <p>Phone: +421 912 345 678</p>
                <p>Address: Adress 123, 901 20 UK</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
