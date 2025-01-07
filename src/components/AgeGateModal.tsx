import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';

interface AgeGateModalProps {
  onVerified: () => void;
}

type NotificationType = 'success' | 'error';

const AgeGateModal: React.FC<AgeGateModalProps> = ({ onVerified }) => {
  const [yearDigits, setYearDigits] = useState(['', '', '', '']);
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);
    const newDigits = [...yearDigits];
    newDigits[index] = sanitizedValue;
    setYearDigits(newDigits);

    // Move focus to the next input if a digit is entered
    if (sanitizedValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !yearDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const birthYearString = yearDigits.join('');
    if (birthYearString.length < 4) {
      showNotification('Please enter a valid 4-digit year.', 'error');
      return;
    }

    const birthYear = parseInt(birthYearString, 10);
    const currentYear = new Date().getFullYear();
    const userAge = currentYear - birthYear;

    if (userAge >= 21) {
      showNotification('Welcome! You are of legal drinking age.', 'success');
      setTimeout(() => {
        onVerified();
      }, 2000); // Delay to allow users to read the message
    } else {
      showNotification('You must be 21 or older to enter this site.', 'error');
    }
  };

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000); // Notification disappears after 3 seconds
  };

  // Handle focus on the first input when the modal opens
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md p-8 text-center
                      bg-gradient-to-tr from-red-800 to-red-600
                      text-white rounded-3xl shadow-2xl relative
                      animate-fade-in">
        {/* Logo and Title */}
        <div className="mb-6">
          <img
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 w-24 h-auto animate-bounce-slow"
          />
          <h1
            id="age-gate-title"
            className="text-2xl md:text-3xl font-extrabold tracking-wider"
          >
            ARE YOU OF LEGAL DRINKING AGE?
          </h1>
          <p className="text-sm md:text-base mt-2">
            Please enter your birth year to continue
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-3">
            {yearDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el!)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 bg-transparent border-b-4 border-gray-300
                           text-center text-xl md:text-2xl
                           focus:outline-none focus:border-yellow-400
                           transition-all duration-200
                           rounded-md
                           caret-yellow-400
                           "
                maxLength={1}
                placeholder="Y"
                autoComplete="off"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-gray-800 font-semibold
                       rounded-full hover:bg-yellow-500 focus:outline-none
                       focus:ring-2 focus:ring-yellow-300 transition
                       transform active:scale-95
                       shadow-md"
          >
            ENTER SITE
          </button>
        </form>

        {/* Notification */}
        {notification.visible && (
          <div
            className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg
                        transition-opacity duration-500
                        ${
                          notification.type === 'success'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }
                        ${notification.visible ? 'opacity-100' : 'opacity-0'}
                        `}
          >
            {notification.message}
          </div>
        )}

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AgeGateModal;
