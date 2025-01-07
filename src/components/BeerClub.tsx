import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import beerGlass from '../assets/beer.png';

interface BeerClubFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
}

const BeerClub: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<BeerClubFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const onSubmit: SubmitHandler<BeerClubFormData> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/beer-club/signup/`, 
        data
      );
      if (response.status === 201) {
        setSuccessMessage('You have successfully signed up for the Nepali Beer Club!');
        reset(); // Reset the form fields
      }
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-100 px-4 py-8 pt-40">
      <div
        className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6 lg:p-10"
        data-aos="fade-up"
      >
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Text and Form Section */}
          <div className="flex-1">
            <h1 className="text-center text-sm font-medium text-gray-600 uppercase mb-1 tracking-wider">
              Nepali Beer
            </h1>
            <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900">
              CLUB
            </h2>
            <p className="text-center text-gray-700 mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
              Kaveri International is proud to present our Nepali Beer Club. Sign up
              today to stay updated with the latest Nepali beer releases, events, and
              special offers. Join our community of beer enthusiasts and experience the
              taste of Nepal in every sip.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First and Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-800 mb-2"
                    htmlFor="first_name"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('first_name', { required: true })}
                    className="w-full border-b-2 border-blue-900 focus:outline-none focus:border-blue-600 text-sm py-2 transition-colors duration-300 placeholder-gray-400"
                    type="text"
                    id="first_name"
                    placeholder="e.g. John"
                  />
                  {errors.first_name && <p className="text-red-500 text-sm mt-1">First name is required</p>}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-800 mb-2"
                    htmlFor="last_name"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('last_name', { required: true })}
                    className="w-full border-b-2 border-blue-900 focus:outline-none focus:border-blue-600 text-sm py-2 transition-colors duration-300 placeholder-gray-400"
                    type="text"
                    id="last_name"
                    placeholder="e.g. Doe"
                  />
                  {errors.last_name && <p className="text-red-500 text-sm mt-1">Last name is required</p>}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-800 mb-2"
                    htmlFor="email"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
                    className="w-full border-b-2 border-blue-900 focus:outline-none focus:border-blue-600 text-sm py-2 transition-colors duration-300 placeholder-gray-400"
                    type="email"
                    id="email"
                    placeholder="e.g. john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">Valid email is required</p>}
                </div>
                <div>
                  <label
                    className="block text-sm font-semibold text-gray-800 mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full border-b-2 border-blue-900 focus:outline-none focus:border-blue-600 text-sm py-2 transition-colors duration-300 placeholder-gray-400"
                    type="tel"
                    id="phone"
                    placeholder="e.g. +1 234 567 8901"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-800 mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  {...register('address')}
                  className="w-full border-b-2 border-blue-900 focus:outline-none focus:border-blue-600 text-sm py-2 transition-colors duration-300 placeholder-gray-400"
                  type="text"
                  id="address"
                  placeholder="e.g. 123 Main St."
                />
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-sm font-semibold text-gray-800 mb-2"
                  htmlFor="message"
                >
                  Leave us a message...
                </label>
                <textarea
                  {...register('message')}
                  className="w-full border-b-2 border-blue-900 focus:outline-none focus:border-blue-600 text-sm py-2 transition-colors duration-300 placeholder-gray-400 h-24 resize-none"
                  id="message"
                  placeholder="Feel free to share your thoughts..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-blue-900 text-white text-sm uppercase tracking-wide font-semibold hover:bg-blue-800 transition-colors duration-300 rounded-md shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Join Now"}
                </button>
              </div>
            </form>

            {/* Error and Success Messages */}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center mt-10 lg:mt-0 lg:w-1/2 max-w-md mx-auto">
            <img
              src={beerGlass}
              alt="Beer Glass"
              className="w-64 sm:w-80 md:w-96 lg:w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeerClub;
