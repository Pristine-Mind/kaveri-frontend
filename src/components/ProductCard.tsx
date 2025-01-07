import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPromptModal from './LoginPromptModal';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  stock_status: boolean;
  stock_quantity?: number;
  image: string;
  category: { id: number; name: string };
}

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  onWishlistToggle: () => void;
  addToCart: (productId: number, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  onWishlistToggle,
  addToCart,
}) => {
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const max = product.stock_status && product.stock_quantity
    ? product.stock_quantity
    : 10;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= max) {
      setQuantity(value);
    } else if (value > max) {
      setQuantity(max);
    } else {
      setQuantity(1);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < max ? prev + 1 : prev));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product.id, quantity);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    // Add max-w-sm and center the card
    <div className="mx-auto max-w-sm border rounded-lg shadow-md p-4
                    transform transition-transform duration-300 ease-in-out
                    hover:scale-105 hover:shadow-xl hover:cursor-pointer">
      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
        <div className="w-full mb-4 overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover
                       hover:opacity-80 transition-opacity duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/fallback-image.jpg';
            }}
          />
        </div>
      </Link>

      {/* Name & Category */}
      <Link to={`/product/${product.id}`}>
        <h3 className="text-lg font-semibold text-blue-600 hover:underline">
          {product.name}
        </h3>
      </Link>
      <p className="text-gray-600">{product.category.name}</p>

      {/* Price or Login prompt */}
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


      {/* Quantity selector */}
      {isAuthenticated && product.stock_status && (
        <div className="flex items-center mt-4">
          <label htmlFor={`quantity-${product.id}`} className="mr-2 text-gray-700">
            Quantity:
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={decrementQuantity}
              className="px-2 py-1 bg-gray-200 text-gray-700
                         rounded-l hover:bg-gray-300 focus:outline-none
                         transition-colors"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="number"
              id={`quantity-${product.id}`}
              min="1"
              max={max}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-16 text-center border-t border-b border-gray-300
                         focus:outline-none"
              aria-label={`Select quantity for ${product.name}`}
            />
            <button
              type="button"
              onClick={incrementQuantity}
              className="px-2 py-1 bg-gray-200 text-gray-700
                         rounded-r hover:bg-gray-300 focus:outline-none
                         transition-colors"
              disabled={quantity >= max}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleAddToCart}
          className={
            `bg-green-500 text-white px-3 py-1 rounded
             hover:bg-green-600 transition-all ` +
            (
              !isAuthenticated || !product.stock_status
                ? 'opacity-50 cursor-not-allowed'
                : ''
            )
          }
          disabled={!isAuthenticated || !product.stock_status}
          title={isAuthenticated ? 'Add to Cart' : 'Login to add to cart'}
        >
          Add to Cart
        </button>

        <button
          onClick={onWishlistToggle}
          className={`text-${isInWishlist ? 'red' : 'gray'}-500
                     hover:text-red-500 transition-all`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      <LoginPromptModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProductCard;
