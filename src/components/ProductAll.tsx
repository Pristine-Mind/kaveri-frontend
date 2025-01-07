import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../components/WishlistContext';
import { motion } from 'framer-motion';
import hero from '../assets/background.jpg';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  stock_status: boolean;
}

const ProductAll: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/products/`)
      .then((response) => {
        setProducts(response.data.results);
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleQuantityChange = (id: number, change: number) => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = prevQuantity[id] || 1;
      const newQuantity = Math.max(updatedQuantity + change, 1);
      return { ...prevQuantity, [id]: newQuantity };
    });
  };

  const handleAddToCart = (productId: number, quantity: number) => {
    axiosInstance
      .post('v1/cart/add_to_cart/', { product_id: productId, quantity })
      .then((response) => {
        console.log('Product added to cart:', response.data);
        toast.success('Product added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="container mx-auto px-6 py-12 pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div
        className="relative w-full max-w-8xl mx-0 mt-0"
        variants={itemVariants}
      >
        <div className="relative">
          <img
            src={hero}
            alt="Banner Image"
            className="w-full h-[600px] object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 flex justify-center items-center z-10 text-center">
          <div>
            <h2 className="text-4xl font-semibold text-yellow-300">
              Shop Now and Save!
            </h2>
            <p className="text-xl text-yellow-300 mt-2">
              Limited time offer on selected items.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {products.map((product) => {
          const isInWishlist = wishlist.some((item) => item.id === product.id);

          return (
            <motion.div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg relative bg-white hover:scale-105 hover:shadow-xl transition-all group overflow-hidden"
              variants={itemVariants}
            >
              {/* Heart Icon */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 cursor-pointer text-gray-400 hover:text-red-500 focus:outline-none transition-transform duration-200 transform hover:scale-110"
                aria-label={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {isInWishlist ? (
                  <FaHeart size={20} className="text-red-500" />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </button>

              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  // Removed h-48, changed to h-auto object-contain (or object-cover)
                  className="w-full h-auto object-contain mb-4 rounded-md
                             hover:opacity-80 transition-opacity duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/fallback-image.jpg';
                  }}
                />
              </Link>

              {/* Product Name */}
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                  {product.name}
                </h3>
              </Link>

              {/* Price (if authenticated) */}
              {isAuthenticated ? (
                <div className="mt-2 space-y-2">
                  <p className="text-blue-600 font-bold">
                    Price: $ {product.price} per case
                  </p>
                  <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="mr-2">🍺</span>
                    <span>Each case contains 24 bottles</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">Login to view prices</p>
              )}

              {/* Quantity Controls */}
              <form className="max-w-xs mx-auto">
                <label
                  htmlFor={`quantity-input-${product.id}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Choose quantity:
                </label>
                <div className="relative flex items-center max-w-[8rem] mx-auto">
                  <button
                    type="button"
                    id={`decrement-button-${product.id}`}
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
                               dark:border-gray-600 hover:bg-gray-200 border border-gray-300
                               rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700
                               focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id={`quantity-input-${product.id}`}
                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center
                               text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500
                               block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600
                               dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                               dark:focus:border-blue-500"
                    value={quantity[product.id] || 1}
                    readOnly
                  />
                  <button
                    type="button"
                    id={`increment-button-${product.id}`}
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600
                               dark:border-gray-600 hover:bg-gray-200 border border-gray-300
                               rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700
                               focus:ring-2 focus:outline-none"
                  >
                    <svg
                      className="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Add to Cart / Sold Out */}
              <button
                className={`w-full py-2 mt-4 rounded ${
                  product.stock_status
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!product.stock_status}
                onClick={() =>
                  handleAddToCart(product.id, quantity[product.id] || 1)
                }
              >
                {product.stock_status ? 'Pre Order' : 'Sold Out'}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default ProductAll;
