import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

interface LocationState {
  orderId: number;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | undefined;
  const { orderId } = state || {};

  useEffect(() => {
    if (!orderId) {
      toast.error("No order information found.");
      navigate('/checkout-summary');
    } else {
      toast.success("Thank you for your order! A confirmation email has been sent to you.");
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
          <p className="text-gray-700 mb-6">
            Thank you for your purchase. Your order ID is <span className="font-semibold">{orderId}</span>.
          </p>
          <p className="text-gray-700">A confirmation email has been sent to your registered email address.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
