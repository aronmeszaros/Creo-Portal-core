
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Cookies = () => {
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
            <Link to="/">
              <Button variant="outline" size="sm" className="border-portal-sage text-portal-sage hover:bg-portal-sage hover:text-white">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-portal-sage hover:text-portal-sage/80 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-portal-dark font-cinzel mb-2">Cookies Policy</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files that are placed on your computer, smartphone, or other device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">2. How We Use Cookies</h2>
              <p>Portal by Creo Designs uses cookies for several purposes:</p>
              <ul className="list-disc ml-6 mt-2">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be disabled</li>
                <li><strong>Performance Cookies:</strong> These help us understand how visitors interact with our website</li>
                <li><strong>Functionality Cookies:</strong> These remember your preferences and choices</li>
                <li><strong>Authentication Cookies:</strong> These keep you logged in during your session</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">3. Types of Cookies We Use</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-portal-dark">Session Cookies</h3>
                  <p>These are temporary cookies that expire when you close your browser. They help us maintain your session while you navigate through our website.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-portal-dark">Persistent Cookies</h3>
                  <p>These cookies remain on your device for a set period or until you delete them. They help us remember your preferences for future visits.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-portal-dark">Third-Party Cookies</h3>
                  <p>We may use third-party services that set their own cookies, such as analytics tools to help us improve our website performance.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">4. Managing Your Cookie Preferences</h2>
              <p>You can control cookies through your browser settings:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Most browsers allow you to view, delete, and block cookies</li>
                <li>You can set your browser to notify you when cookies are being used</li>
                <li>You can choose to accept or reject cookies on a case-by-case basis</li>
                <li>Please note that blocking certain cookies may affect website functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">5. Browser-Specific Cookie Management</h2>
              <div className="space-y-2">
                <p><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</p>
                <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
                <p><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</p>
                <p><strong>Edge:</strong> Settings → Site permissions → Cookies and site data</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">6. Updates to This Policy</h2>
              <p>We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-portal-dark mb-3">7. Contact Us</h2>
              <p>If you have any questions about our use of cookies, please contact us at:</p>
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

export default Cookies;
