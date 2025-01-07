import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWishlist } from '../components/WishlistContext';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const UserIcons: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated, logout, token } = useAuth();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const accountRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
      if (
        wishlistRef.current &&
        !wishlistRef.current.contains(event.target as Node)
      ) {
        setIsWishlistOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated && token) {
      axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/profile/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
    } else {
      setUser(null);
    }
  }, [isAuthenticated, token]);

  const handleRemove = (productId: number, productName: string) => {
    confirmAlert({
      title: 'Confirm to remove',
      message: `Are you sure you want to remove ${productName} from your wishlist?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeFromWishlist(productId),
        },
        {
          label: 'No',
          onClick: () => {}, 
        },
      ],
    });
  };

  return (
    <div className="flex items-center space-x-4 p-0 text-white relative">
      <div
        className="relative"
        ref={accountRef}
      >
        {isAuthenticated && user ? (
          <button
            onClick={() => setIsAccountOpen((prev) => !prev)}
            className="flex items-center space-x-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-haspopup="true"
            aria-expanded={isAccountOpen}
          >
            <FaUser />
            <span className="text-sm">{user.username}</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAccountOpen((prev) => !prev)}
            className="flex items-center space-x-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            aria-haspopup="true"
            aria-expanded={isAccountOpen}
          >
            <FaUser />
            <span className="text-sm">Account</span>
          </button>
        )}

        {isAccountOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-blue-500 text-red-700 rounded-lg shadow-lg z-20 transition transform origin-top-right animate-dropdown">
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-t-lg"
                  role="menuitem"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200 rounded-b-lg flex items-center"
                  role="menuitem"
                >
                  <FaSignOutAlt className="inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-t-lg"
                  role="menuitem"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-b-lg"
                  role="menuitem"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      {/* Wishlist Icon */}
      <div
        className="relative"
        ref={wishlistRef}
      >
        <button
          onClick={() => setIsWishlistOpen((prev) => !prev)}
          className="flex items-center space-x-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-haspopup="true"
          aria-expanded={isWishlistOpen}
        >
          <FaHeart className="text-red-500" />
          <span className="text-sm">Wishlist ({wishlist.length})</span>
        </button>
        {isWishlistOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-20 transition transform origin-top-right animate-dropdown">
            <h3 className="font-semibold mb-2">Wishlist Items</h3>
            {wishlist.length > 0 ? (
              <ul className="max-h-48 overflow-y-auto">
                {wishlist.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-1">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <span className="text-sm text-yellow-500">{item.price} NPR</span>
                    </div>
                    <button
                      onClick={() => handleRemove(item.productId, item.name)}
                      className="text-red-500 text-xs hover:text-red-700 focus:outline-none"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No items in wishlist.</p>
            )}
          </div>
        )}
      </div>

      {/* Shopping Cart Icon */}
      <Link
        to="/cart"
        className="flex items-center space-x-1 cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
        aria-label="Shopping Cart"
      >
        <FaShoppingCart />
        <span className="text-sm">Cart</span>
      </Link>
    </div>
  );
};

export default UserIcons;
