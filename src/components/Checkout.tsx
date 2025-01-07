import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import { FaSpinner } from 'react-icons/fa';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { userId, cartId } = useContext(AuthContext);
  console.log('Cart ID:', cartId);

  const [formData, setFormData] = useState({
    shippingFirstName: '',
    shippingLastName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingCountry: 'United States',
    shippingState: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingAddress: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = () => {
    const {
      shippingFirstName,
      shippingLastName,
      shippingEmail,
      shippingPhone,
      shippingState,
      shippingCity,
      shippingPostalCode,
      shippingAddress,
    } = formData;

    if (
      !shippingFirstName.trim() ||
      !shippingLastName.trim() ||
      !shippingEmail.trim() ||
      !shippingPhone.trim() ||
      !shippingState.trim() ||
      !shippingCity.trim() ||
      !shippingPostalCode.trim() ||
      !shippingAddress.trim()
    ) {
      toast.error('Please fill in all required fields.');
      return false;
    }

    // Additional validations can be added here (e.g., email format, phone number format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingEmail)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    const phoneRegex = /^\d{10}$/; // Example: 10-digit phone number
    if (!phoneRegex.test(shippingPhone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the payload, including cartId
      const payload = {
        first_name: formData.shippingFirstName,
        last_name: formData.shippingLastName,
        email: formData.shippingEmail,
        phone: formData.shippingPhone,
        country: formData.shippingCountry,
        state: formData.shippingState,
        city: formData.shippingCity,
        postal_code: formData.shippingPostalCode,
        address: formData.shippingAddress,
        cart: cartId, // Corrected field name
        // user_id: userId, // Uncomment if backend requires it
      };

      // Send POST request to the Shipping API using relative URL
      const response = await axiosInstance.post('v1/shipping/', payload);

      if (response.status === 200 || response.status === 201) {
        toast.success('Shipping information saved successfully!');
        navigate('/checkout-summary'); // Navigate to summary page
      } else {
        toast.error('Failed to save shipping information. Please try again.');
      }
    } catch (error: any) {
      console.error('Error submitting shipping data:', error);

      if (error.response && error.response.data) {
        // Display specific error messages from the backend
        const backendErrors = error.response.data;
        Object.keys(backendErrors).forEach((key) => {
          const errorMessages = backendErrors[key];
          errorMessages.forEach((msg: string) => {
            toast.error(`${key}: ${msg}`);
          });
        });
      } else {
        // Network or unexpected errors
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const usStates = ['Texas'];

  const citiesByState: Record<string, string[]> = {
    Texas: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'],
  };

  const availableCities = formData.shippingState
    ? citiesByState[formData.shippingState] || []
    : [];

  // Handle "Cancel" button click
  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-40">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit}>
          {/* Shipping Address Section */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-6">
            Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="shippingFirstName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="shippingFirstName"
                name="shippingFirstName"
                value={formData.shippingFirstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="shippingLastName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="shippingLastName"
                name="shippingLastName"
                value={formData.shippingLastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* Email Address */}
            <div>
              <label
                htmlFor="shippingEmail"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="shippingEmail"
                name="shippingEmail"
                value={formData.shippingEmail}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="shippingPhone"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="shippingPhone"
                name="shippingPhone"
                value={formData.shippingPhone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                pattern="\d{10}" // Example: 10-digit phone number
                title="Please enter a 10-digit phone number."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* Country */}
            <div>
              <label
                htmlFor="shippingCountry"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="shippingCountry"
                name="shippingCountry"
                value={formData.shippingCountry}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="United States">United States</option>
                {/* Add more countries if needed */}
              </select>
            </div>

            {/* State/Province */}
            <div>
              <label
                htmlFor="shippingState"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                State/Province
              </label>
              <select
                id="shippingState"
                name="shippingState"
                value={formData.shippingState}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select a state</option>
                {usStates.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* City */}
            <div>
              <label
                htmlFor="shippingCity"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                City
              </label>
              <select
                id="shippingCity"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                disabled={!formData.shippingState}
              >
                <option value="">Select a city</option>
                {availableCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="shippingAddress"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* Postal Code */}
            <div>
              <label
                htmlFor="shippingPostalCode"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="shippingPostalCode"
                name="shippingPostalCode"
                value={formData.shippingPostalCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          {/* Display loading indicator during submission */}
          {isSubmitting && (
            <div className="flex justify-center items-center mt-4">
              <FaSpinner className="animate-spin text-blue-500 text-xl" />
              <span className="ml-2 text-blue-500">Submitting...</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            {/* Cancel Button */}
            <button
              type="button"
              className="px-8 py-3 bg-gray-300 text-gray-700 text-lg font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200"
              onClick={handleCancel}
            >
              Cancel
            </button>

            {/* Continue Button */}
            <button
              type="submit"
              className={`px-8 py-3 text-lg font-semibold rounded-md ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition-colors duration-200`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
