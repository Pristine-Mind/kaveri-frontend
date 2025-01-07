import React from 'react';

const StorePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 lg:px-8 pt-40">
      <div className="max-w-7xl mx-auto">
        {/* Store Policy Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Store Policy</h2>

        {/* Customer Care Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Care</h3>
          <p className="text-gray-700 mb-4">
            Thank you for visiting our e-commerce website! We value your privacy and want to ensure you understand how we collect, use, and protect your personal information. By using our website, you consent to the practices outlined in this policy.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">1. Collection of Personal Information</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Personal Information:</strong> Your name, email address, postal address, phone number, and other information you provide during registration or checkout.</li>
            <li><strong>Payment Information:</strong> Your payment card details, which are processed securely by a third-party payment gateway; we do not store this information.</li>
            <li><strong>Log Data:</strong> Automatically recorded data such as your IP address, browser type, referring/exit pages, and operating system, which helps us analyze trends and user engagement.</li>
          </ul>
          <h4 className="text-xl font-semibold text-gray-800">2. Use of Personal Information</h4>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Order Processing:</strong> To fulfill your orders, communicate order status, and provide customer support.</li>
            <li><strong>Communication:</strong> To send you updates, newsletters, and promotions. You can opt-out at any time.</li>
            <li><strong>Site Improvement:</strong> To analyze user behavior and enhance your experience on our website.</li>
          </ul>
          <h4 className="text-xl font-semibold text-gray-800">3. Sharing of Personal Information</h4>
          <p className="text-gray-700 mb-4">
            We may share your information with third-party service providers that assist us in operating our business. These providers are required to handle your information securely and only for the services they provide. We do not sell, trade, or rent your personal information for marketing purposes.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">4. Cookies and Tracking Technologies</h4>
          <p className="text-gray-700 mb-4">
            We use cookies and similar technologies to enhance your browsing experience and analyze website usage. You can control cookie use through your browser settings.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">5. Data Security</h4>
          <p className="text-gray-700 mb-4">
            We implement appropriate security measures to protect your personal information, but no method of transmission or storage is 100% secure.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">6. Third-Party Links</h4>
          <p className="text-gray-700 mb-4">
            Our website may contain links to third-party websites. We are not responsible for their privacy practices. We encourage you to review their policies before providing personal information.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">7. Children's Privacy</h4>
          <p className="text-gray-700 mb-4">
            Our services are not intended for individuals under 21. We do not knowingly collect personal information from children. If you believe your child has provided us with information, please contact us immediately.
          </p>
          <h4 className="text-xl font-semibold text-gray-800">8. Changes to this Privacy Policy</h4>
          <p className="text-gray-700 mb-4">
            We may update this policy at any time and will notify you by posting the revised version on our website with an updated date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorePolicy;
