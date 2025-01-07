import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqData = [
  {
    question: "What is Kaveri International?",
    answer: "Kaveri International is a company focused on bringing high-quality Nepali alcoholic beverages to the global market. We offer a range of premium Nepali beers and strive to create a unique drinking experience."
  },
  {
    question: "How can I place an order?",
    answer: "You can place an order on our website. Browse through our products, add them to your cart, and proceed to checkout. We accept a variety of payment methods."
  },
  {
    question: "What is your return policy?",
    answer: "We don't provide return policy"
  },
  {
    question: "How long does shipping take?",
    answer: "We aim to ship your order promptly. The shipping time depends on your location. Most orders are delivered within 5-7 business days."
  }
];
const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-8 pt-40">
      <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <motion.div
              className="cursor-pointer"
              onClick={() => toggleAnswer(index)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
            </motion.div>

            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-gray-600"
              >
                <p>{faq.answer}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
