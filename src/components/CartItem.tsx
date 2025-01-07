import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

const cartItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const CartItem: React.FC<CartItemProps> = ({
  cartItemId,
  productId,
  name,
  price,
  quantity,
  totalPrice,
  image,
  cartId,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  const confirmRemove = () => {
    confirmAlert({
      title: 'Confirm to remove',
      message: `Are you sure you want to remove ${name} from your cart?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleRemoveItem(cartId, productId),
        },
        {
          label: 'No',
          onClick: () => {}, // Do nothing
        },
      ],
    });
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 space-y-4 md:space-y-0"
      variants={cartItemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      {/* Left section: Image & Product Info */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-orange-500 text-sm">Price: ${price.toFixed(2)}</p>
        </div>
      </div>

      {/* Middle section: Quantity controls (centered on mobile) */}
      <div className="flex items-center justify-center space-x-4 w-full md:w-auto">
        <motion.button
          onClick={() => handleQuantityChange(cartId, productId, quantity - 1)}
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-200"
          whileTap={{ scale: 0.9 }}
          aria-label={`Decrease quantity of ${name}`}
        >
          <FaMinus />
        </motion.button>

        <span className="text-lg font-semibold">{quantity}</span>

        <motion.button
          onClick={() => handleQuantityChange(cartId, productId, quantity + 1)}
          className="p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors duration-200"
          whileTap={{ scale: 0.9 }}
          aria-label={`Increase quantity of ${name}`}
        >
          <FaPlus />
        </motion.button>
      </div>

      {/* Right section: Total price & Remove button */}
      <div className="flex items-center justify-between md:justify-center space-x-4 w-full md:w-auto">
        <p className="text-lg font-semibold text-gray-700">
          ${totalPrice.toFixed(2)}
        </p>
        <motion.button
          onClick={confirmRemove}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
          whileTap={{ scale: 0.9 }}
          aria-label={`Remove ${name} from cart`}
        >
          <FaTrash />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;
