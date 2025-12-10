
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
            <h1 className="text-3xl font-bold text-portal-dark font-cinzel mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Portal by Creo Designs ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">2. Description of Service</h2>
              <p>Portal by Creo Designs is a platform that connects clients with interior designers for various design services including:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Single Design Consultation</li>
                <li>Full Design Concept</li>
                <li>Design & Procurement services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">3. User Accounts</h2>
              <p>To access certain features of the Service, you must register for an account. You agree to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your password</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">4. Project Submissions and Services</h2>
              <p>When you submit a project inquiry:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>You grant us permission to share relevant project details with our designers</li>
                <li>You agree to provide accurate project requirements and budget information</li>
                <li>You understand that project timelines and costs may vary based on scope</li>
                <li>You agree to communicate professionally with assigned designers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">5. Payment Terms</h2>
              <p>Payment terms vary by service type:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Consultation fees are due upon booking</li>
                <li>Project payments may be structured in milestones</li>
                <li>Refund policies are service-specific and will be communicated clearly</li>
                <li>All prices are subject to applicable taxes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">6. Intellectual Property</h2>
              <p>Design concepts and deliverables created through our platform:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Remain the property of the assigned designer until full payment</li>
                <li>Are licensed to you for the agreed project scope upon payment</li>
                <li>May not be used for commercial purposes without additional licensing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">7. Limitation of Liability</h2>
              <p>Portal by Creo Designs shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">8. Termination</h2>
              <p>We reserve the right to terminate or suspend your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">9. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be effective upon posting. Continued use of the Service constitutes acceptance of modified terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">10. Contact Information</h2>
              <p>For questions about these Terms of Service, please contact us at:</p>
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

export default Terms;
