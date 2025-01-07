import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { FaHeart } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

interface Review {
  id: number;
  name: string;
  rating: number;
  review_text: string;
  photos: { id: number; image: string }[];
  created_at: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });

    if (id) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => console.error('Error fetching product details:', err));

      axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/review/?product=${id}`)
        .then((res) => {
          setReviews(res.data.results);
        })
        .catch((err) => console.error('Error fetching reviews:', err));
    }

    axiosInstance
      .get('v1/profile/')
      .then((response) => {
        setUsername(response.data.full_name);
        setEmail(response.data.email);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
        setIsAuthenticated(false);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const sanitizedDescription = DOMPurify.sanitize(product.description);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleWishlistToggle = () => {
    setIsInWishlist((prev) => !prev);
  };

  const handleAddToCart = () => {
    axiosInstance
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/cart/add_to_cart/`, {
        product_id: product.id,
        quantity: quantity,
      })
      .then((response) => {
        console.log('Product added to cart:', response.data);
        toast.success('Product added to cart successfully!');
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  const handleReviewSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to leave a review.');
      return;
    }

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/review/`,
        {
          product: product.id,
          rating: newReviewRating,
          review_text: newReviewText,
          name: username,
          email: email,
        }
      );
      setReviews([response.data, ...reviews]); // Prepend new review to the list
      setShowReviewForm(false); // Close the review form after submission
      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-20 py-20 pt-40">
      <div className="flex flex-col md:flex-row">
        {/* Main Product Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            // Changed from 'h-96 object-cover' to 'h-auto object-contain'
            // so the full image is shown on large screens without cropping
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Product Info & Actions */}
        <div className="md:w-1/2 p-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>

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

          <div className="mt-4 flex items-center">
            <label className="text-sm mr-2">Quantity</label>
            <button
              className="border px-2 py-1 text-xl font-bold text-gray-700"
              onClick={decrementQuantity}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="border px-4 py-2 w-16 text-center"
              min="1"
            />
            <button
              className="border px-2 py-1 text-xl font-bold text-gray-700"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <div
            className="text-gray-700 mt-4"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />

          <div className="mt-6 flex items-center">
            <button
              className="w-full py-2 rounded bg-orange-900 text-white"
              onClick={handleAddToCart}
            >
              Pre Order
            </button>

            <FaHeart
              className={`ml-4 cursor-pointer ${
                isInWishlist ? 'text-red-500' : 'text-gray-400'
              }`}
              size={24}
              onClick={handleWishlistToggle}
            />
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Product Reviews</h2>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md mb-6 flex"
              data-aos="fade-up"
            >
              <div className="w-3/4 pr-6">
                <div className="flex items-center mb-2">
                  <p className="text-xl font-semibold">{review.name}</p>
                  <span className="ml-4 text-sm text-gray-500">Verified Buyer</span>
                </div>

                <div className="flex items-center mb-2">
                  {[...Array(review.rating)].map((_, index) => (
                    <span key={index} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - review.rating)].map((_, index) => (
                    <span key={index} className="text-gray-300">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 mb-4">{review.review_text}</p>
                <div className="text-gray-500 text-sm">
                  Reviewed on: {new Date(review.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="w-1/4 flex flex-wrap justify-end space-x-2">
                {review.photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.image}
                    alt="Review Photo"
                    // This uses object-cover to fill 24x24 squares.
                    // If you prefer full uncropped images, switch to object-contain.
                    className="w-24 h-24 object-cover rounded-md mb-2"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No reviews yet. Be the first to review this product!</p>
        )}

        {/* Review Button */}
        {isAuthenticated && !showReviewForm && (
          <button
            className="mt-6 py-2 px-6 bg-blue-600 text-white rounded-md"
            onClick={() => setShowReviewForm(true)}
          >
            Leave a Review
          </button>
        )}

        {/* Review Form */}
        {showReviewForm && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Submit Your Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Rating</label>
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setNewReviewRating(index + 1)}
                    className={`cursor-pointer text-xl ${
                      newReviewRating > index ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Your Review</label>
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Write your review here"
              />
            </div>

            <button
              onClick={handleReviewSubmit}
              className="py-2 px-6 bg-blue-600 text-white rounded-md"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
