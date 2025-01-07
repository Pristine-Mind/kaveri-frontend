import React, { useEffect, useState, useContext } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';

interface CartItemProps {
  cartItemId: number; 
  productId: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
  cartId: number;
  handleQuantityChange: (cartId: number, productId: number, quantity: number) => void;
  handleRemoveItem: (cartId: number, productId: number) => void;
}

interface CartProps {
  items?: CartItemProps[];
  id?: number;
  user?: number;
}

const cartContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const Cart: React.FC<CartProps> = ({ items = [], id, user }) => {
  const { userId, token, cartId, setCartId } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState<CartItemProps[]>(items);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCartFetched, setIsCartFetched] = useState(false);

  useEffect(() => {
    if (isCartFetched) return;
    if (!userId) return;
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/cart/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.results.length === 0) {
          setCartItems([]);
          setIsCartFetched(true);
          setIsLoading(false);
          return;
        }
        const cartData = response.data.results[0]['items'];
        const cartId = response.data.results[0]['id'];
        setCartId(cartId); // Set cart ID in context
        const cartItemsData = cartData.map((item: any) => ({
          cartItemId: item.id,
          productId: item.product_details.id,
          name: item.product_details.name,
          price: parseFloat(item.product_details.price),
          quantity: item.quantity,
          totalPrice: parseFloat(item.product_details.price) * item.quantity,
          image: item.product_details.image,
          cartId: cartId,
          handleQuantityChange: handleQuantityChange,
          handleRemoveItem: handleRemoveItem,
        }));
        
        setCartItems(cartItemsData);
        setIsCartFetched(true);
        setIsLoading(false);
      })
      .catch((err) => {
        setError('Failed to load cart data');
        setIsLoading(false);
      });
  }, [isCartFetched]);

  const handleQuantityChange = (cartId: number, productId: number, newQuantity: number) => {

    if (newQuantity <= 0) return;
    axiosInstance
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/cart/${cartId}/update_quantity/`,
        { item_id: productId, quantity: newQuantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      .then((response) => {
        const updatedItems = cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity } : item
        );
        setCartItems(updatedItems);
        toast.success('Quantity updated successfully!');
      })
      .catch((err) => {
        console.error('Error updating quantity:', err);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(`Error: ${err.response.data.error}`);
        } else {
          toast.error('Failed to update quantity.');
        }
      });
  };

  const handleRemoveItem = (cartId: number, productId: number) => {
    axiosInstance
      .post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/cart/${cartId}/remove_from_cart/`,
        { product_id: productId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Display a success message
        toast.success(response.data.message);

        // Remove the item from the local state
        const updatedItems = cartItems.filter((item) => item.productId !== productId);
        setCartItems(updatedItems);
      })
      .catch((err) => {
        console.error('Error removing item:', err);
        if (err.response && err.response.data && err.response.data.error) {
          toast.error(`Error: ${err.response.data.error}`);
        } else {
          toast.error('Failed to remove item from cart.');
        }
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="flex items-center space-x-2 text-blue-500 text-2xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <FaSpinner className="animate-spin" />
          <span>Loading...</span>
        </motion.div>
      </div>
    );
  }

  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h2>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-6"
          variants={cartContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  cartItemId={item.cartItemId}
                  productId={item.productId}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  totalPrice={item.totalPrice}
                  image={item.image}
                  cartId={item.cartId}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                />
              ))
            ) : (
              <motion.p
                className="text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Your cart is empty.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {cartItems.length > 0 && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between mb-4">
              <p className="text-lg font-semibold">Subtotal:</p>
              <p className="text-lg">${cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Grand Total:</p>
              <p>${cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}</p>
            </div>
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <Link to="/checkout">
            <motion.button
              className={`px-8 py-3 ${
                cartItems.length > 0
                  ? 'bg-blue-900 hover:bg-blue-800 text-white'
                  : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              } text-lg font-semibold rounded-lg transition-colors duration-200`}
              disabled={cartItems.length === 0}
              whileHover={{ scale: cartItems.length > 0 ? 1.05 : 1 }}
              whileTap={{ scale: cartItems.length > 0 ? 0.95 : 1 }}
            >
              Checkout
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
