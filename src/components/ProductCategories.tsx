import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/product-category/`)
      .then((response) => response.json())
      .then((data) => setCategories(data.results))
      .catch((error) => console.error('Error fetching categories:', error));

    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const gradients = [
    'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500',
    'bg-gradient-to-r from-green-400 via-blue-500 to-teal-500',
    'bg-gradient-to-r from-red-400 via-yellow-500 to-orange-500',
    'bg-gradient-to-r from-indigo-400 via-pink-500 to-yellow-400',
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card rounded-lg p-6 text-white shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:translate-y-2 hover:cursor-pointer flex flex-col items-center bg-gray-200`}
            data-aos="fade-up"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-40 h-40 object-cover mb-4 border-4 border-white"
            />
            <h3 className="text-center font-medium text-lg text-black">{category.name}</h3>
            {/* Optionally, you can display the description */}
            {/* <p className="text-center mt-2 text-sm">{category.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
