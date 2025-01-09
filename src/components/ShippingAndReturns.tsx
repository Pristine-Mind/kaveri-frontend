import React from 'react';

const ShippingAndReturns: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 pt-40">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">Shipping & Returns</h2>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Policy</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            Kaveri International is dedicated to ensuring that your orders are shipped promptly and efficiently. We prioritize
            the safe delivery of your high-quality Nepali alcoholic beverages. Our shipping methods are reliable, and we strive
            to keep the costs reasonable for our valued customers.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            We are committed to transparent packaging and shipping costs. Rest assured that we work diligently to build trust and
            loyalty among our customers.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Return Policy</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            We pride ourselves on the quality and integrity of the products and services we offer. As such, all sales are final, with no exceptions. This means we do not offer returns, exchanges, or refunds of any kind under any circumstances. We believe in empowering our customers to make informed purchasing decisions, and our team is always here to assist you prior to completing your order.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            By placing an order with us, you acknowledge and accept our strict no-return policy. This ensures a seamless and efficient experience for all our valued customers. Thank you for understanding and supporting our commitment to providing exceptional value without compromising on transparency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndReturns