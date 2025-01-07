import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import beerImage from '../assets/background.jpg';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<ContactFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/contact-us/signup/`, 
        data
      );
      if (response.status === 201) {
        setSuccessMessage('Your message has been successfully submitted!');
        reset(); // Clear form fields
      }
    } catch (error) {
      setErrorMessage('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 pt-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-3xl font-bold text-blue-500">KAVERI INTERNATIONAL</h1>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email:</h2>
            <span className="text-blue-600 font-semibold">For Inquiries: info@kaverintl.com</span>
            <p></p>
            <span className="text-blue-600 font-semibold">For Orders: orders@kaverintl.com</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Phone:</h2>
            <p className="text-gray-600 font-semibold">Tel: +1 832 684 3122</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Address:</h2>
            <p className="text-gray-600 font-semibold">Haltom City, Texas, USA 76111</p>
          </div>
          <div className="flex justify-left space-x-8 mt-8 ml-0">
            <a href="https://www.facebook.com/people/Kaveri-International/61565650737421/" className="text-gray-600 hover:text-orange-500">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com/kaveri.international/" className="text-gray-600 hover:text-orange-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@kaveriinternation?lang=en" className="text-gray-600 hover:text-orange-500">
              <FaTiktok size={20} />
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Invalid email format'
                    } 
                  })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register('phone', {required: 'Phone Number is required',})}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your Phone Number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  {...register('message', { required: 'Message is required' })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={4}
                  placeholder="Your Message"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Now"}
                </button>
              </div>
            </div>
          </form>

          {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
