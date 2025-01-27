import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputMask from 'react-input-mask';
import emailjs from '@emailjs/browser';

// Define the structure of user form data
interface UserFormData {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
}

// Define the structure of profile form data
interface ProfileFormData {
  business_name: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_zip: string;
  business_phone: string;
  license_number: string;
}

// Combine user and profile data into a single type
type RegistrationData = UserFormData & ProfileFormData;

// Define Yup validation schemas
const userSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const profileSchema = Yup.object().shape({
  business_name: Yup.string().required('Business name is required'),
  business_address: Yup.string().required('Business address is required'),
  business_city: Yup.string().required('Business city is required'),
  business_state: Yup.string().required('Business state is required'),
  business_zip: Yup.string()
    .required('Business ZIP is required')
    .matches(/^\d{5}$/, 'ZIP must be exactly 5 digits'),
  business_phone: Yup.string()
    .required('Business phone is required')
    .matches(
      /^\+1\s\(\d{3}\)\s\d{3}-\d{4}$/,
      'Invalid phone number format. Expected format: +1 (xxx) xxx-xxxx'
    ),
  license_number: Yup.string().required('License Number is required'),
});

const Register: React.FC = () => {
  // State management for multi-step form
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Initialize react-hook-form for UserFormData with Yup validation
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    formState: { errors: userErrors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userSchema),
    mode: 'onBlur',
  });

  // Initialize react-hook-form for ProfileFormData with Yup validation
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    mode: 'onBlur',
  });

  // State to store user data from Step 1
  const [userData, setUserData] = useState<UserFormData | null>(null);

  // Handle submission of Step 1 (User Information)
  const onSubmitUser: SubmitHandler<UserFormData> = (data) => {
    setUserData(data);
    setStep(2);
  };

  /**
   * Function to send confirmation email using EmailJS
   * @param data - Combined registration data (user and profile)
   */
  const sendConfirmationEmail = async (data: RegistrationData) => {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Define the parameters to be sent to the email template
    const templateParams = {
      to_email: data.email,
      first_name: data.first_name,
      business_name: data.business_name,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const onSubmitProfile: SubmitHandler<ProfileFormData> = async (profileData) => {
    if (!userData) {
      setErrorMessage('Missing user data from step 1.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const finalData: RegistrationData = { ...userData, ...profileData };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/register`,
        finalData
      );
      console.log('Registration successful', response);

      await sendConfirmationEmail(finalData);

      alert('Registration complete!');
      setShowPopup(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.detail || 'Registration failed. Please try again.'
        );
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 relative"
      style={{
        backgroundImage:
          'url(https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-6/300984598_1674044502970227_7362308765199212657_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=6aHzrU2GMiEQ7kNvgH6EqT5&_nc_oc=AdgLkTeFWUOANFNuIHIfg8HJKw96JpbsMAP89-il2JeT7zm5HHtzj9hVIrW0E7zpwCJxywiZE_7T2DPB4YDrWTjK&_nc_zt=23&_nc_ht=scontent.fktm8-1.fna&_nc_gid=ARS-1T4jWmzPpBSOL4s9vBh&oh=00_AYDQSFwojp8R_8zx2Vx8C5-KQYVRRx9k4sSKuIwnFF-34w&oe=676ED74D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Registration Form Container */}
      <div className="relative max-w-6xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {step === 1 ? 'Register (Step 1)' : 'Register (Step 2)'}
          </h2>

          {/* Display Error Message if any */}
          {errorMessage && (
            <div className="text-red-600 mb-4 text-center">{errorMessage}</div>
          )}

          {/* STEP 1: User Information */}
          {step === 1 && (
            <form onSubmit={handleSubmitUser(onSubmitUser)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...registerUser('email')}
                  className={`w-full p-3 mt-1 border ${
                    userErrors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {userErrors.email && (
                  <span className="text-red-600 text-sm">{userErrors.email.message}</span>
                )}
              </div>

              {/* First Name Field */}
              <div>
                <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="first_name"
                  type="text"
                  {...registerUser('first_name')}
                  className={`w-full p-3 mt-1 border ${
                    userErrors.first_name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {userErrors.first_name && (
                  <span className="text-red-600 text-sm">{userErrors.first_name.message}</span>
                )}
              </div>

              {/* Last Name Field */}
              <div>
                <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="last_name"
                  type="text"
                  {...registerUser('last_name')}
                  className={`w-full p-3 mt-1 border ${
                    userErrors.last_name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {userErrors.last_name && (
                  <span className="text-red-600 text-sm">{userErrors.last_name.message}</span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password<span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  {...registerUser('password')}
                  className={`w-full p-3 mt-1 border ${
                    userErrors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {userErrors.password && (
                  <span className="text-red-600 text-sm">{userErrors.password.message}</span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  {...registerUser('confirm_password')}
                  className={`w-full p-3 mt-1 border ${
                    userErrors.confirm_password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {userErrors.confirm_password && (
                  <span className="text-red-600 text-sm">
                    {userErrors.confirm_password.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  Next (Business Info)
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Business Profile */}
          {step === 2 && (
            <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
              {/* Business Name Field */}
              <div>
                <label htmlFor="business_name" className="block text-sm font-semibold text-gray-700">
                  Business Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="business_name"
                  type="text"
                  {...registerProfile('business_name')}
                  className={`w-full p-3 mt-1 border ${
                    profileErrors.business_name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {profileErrors.business_name && (
                  <span className="text-red-600 text-sm">
                    {profileErrors.business_name.message}
                  </span>
                )}
              </div>

              {/* Business Address Field */}
              <div>
                <label htmlFor="business_address" className="block text-sm font-semibold text-gray-700">
                  Business Address<span className="text-red-500">*</span>
                </label>
                <input
                  id="business_address"
                  type="text"
                  {...registerProfile('business_address')}
                  className={`w-full p-3 mt-1 border ${
                    profileErrors.business_address ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {profileErrors.business_address && (
                  <span className="text-red-600 text-sm">
                    {profileErrors.business_address.message}
                  </span>
                )}
              </div>

              {/* Business City Field */}
              <div>
                <label htmlFor="business_city" className="block text-sm font-semibold text-gray-700">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  id="business_city"
                  type="text"
                  {...registerProfile('business_city')}
                  className={`w-full p-3 mt-1 border ${
                    profileErrors.business_city ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {profileErrors.business_city && (
                  <span className="text-red-600 text-sm">
                    {profileErrors.business_city.message}
                  </span>
                )}
              </div>

              {/* Business State and ZIP Fields */}
              <div className="flex space-x-2">
                {/* State Field */}
                <div className="w-1/2">
                  <label htmlFor="business_state" className="block text-sm font-semibold text-gray-700">
                    State<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="business_state"
                    type="text"
                    {...registerProfile('business_state')}
                    className={`w-full p-3 mt-1 border ${
                      profileErrors.business_state ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {profileErrors.business_state && (
                    <span className="text-red-600 text-sm">
                      {profileErrors.business_state.message}
                    </span>
                  )}
                </div>

                {/* ZIP Field */}
                <div className="w-1/2">
                  <label htmlFor="business_zip" className="block text-sm font-semibold text-gray-700">
                    ZIP<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="business_zip"
                    type="text"
                    {...registerProfile('business_zip')}
                    className={`w-full p-3 mt-1 border ${
                      profileErrors.business_zip ? 'border-red-500' : 'border-gray-300'
                    } rounded-md`}
                  />
                  {profileErrors.business_zip && (
                    <span className="text-red-600 text-sm">
                      {profileErrors.business_zip.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Business Phone Field with Input Mask */}
              <div>
                <label htmlFor="business_phone" className="block text-sm font-semibold text-gray-700">
                  Business Phone<span className="text-red-500">*</span>
                </label>
                <InputMask
                  mask="+1 (999) 999-9999"
                  maskChar=""
                  {...registerProfile('business_phone')}
                >
                  {(inputProps: any) => (
                    <input
                      {...inputProps}
                      id="business_phone"
                      type="text"
                      placeholder="+1 (555) 555-5555"
                      className={`w-full p-3 mt-1 border ${
                        profileErrors.business_phone ? 'border-red-500' : 'border-gray-300'
                      } rounded-md`}
                    />
                  )}
                </InputMask>
                {profileErrors.business_phone && (
                  <span className="text-red-600 text-sm">
                    {profileErrors.business_phone.message}
                  </span>
                )}
              </div>

              {/* U.S. Tax ID (EIN) Field */}
              <div>
                <label htmlFor="license_number" className="block text-sm font-semibold text-gray-700">
                  U.S. Tax ID (EIN)<span className="text-red-500">*</span>
                </label>
                <input
                  id="license_number"
                  type="text"
                  {...registerProfile('license_number')}
                  className={`w-full p-3 mt-1 border ${
                    profileErrors.license_number ? 'border-red-500' : 'border-gray-300'
                  } rounded-md`}
                />
                {profileErrors.license_number && (
                  <span className="text-red-600 text-sm">
                    {profileErrors.license_number.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {loading ? 'Registering...' : 'Finish Registration'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Illustration/Image Section */}
        <div className="w-full lg:w-1/2 hidden lg:block">
          <img
            src="https://www.shutterstock.com/image-photo/beer-mug-splashes-foam-isolated-600nw-650618740.jpg"
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Your registration is under verification
            </h2>
            <p>
              Your registration is under verification, and we will notify you once verified.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md"
              onClick={() => {
                setShowPopup(false);
                navigate('/');
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
