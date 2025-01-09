import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const CheckoutSummary: React.FC = () => {
  const navigate = useNavigate();
  const { userId, cartId, token } = useContext(AuthContext);

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("Standard");
  const [promoCode, setPromoCode] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [offerCases, setOfferCases] = useState<number>(0); // Added state for offer cases
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (cartId && userId) {
      fetchShippingAddress();
      fetchCartItems();
    } else {
      toast.error("Missing cart or user information.");
      navigate("/checkout");
    }
  }, [cartId, userId]);

  const fetchShippingAddress = async () => {
    try {
      const response = await axiosInstance.get(`v1/shipping/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShippingAddress(response.data);
      // We no longer calculate the delivery charge based on the address.
    } catch (error: any) {
      console.error("Error fetching shipping address:", error);
      toast.error("Failed to fetch shipping address.");
    }
  };

  const fetchCartItems = async () => {
    if (isCartFetched) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`v1/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.results.length === 0) {
        setCartItems([]);
        setIsCartFetched(true);
        setIsLoading(false);
        return;
      }
      const cartData = response.data.results[0];
      const cartItemsData = cartData.items.map((item: any) => ({
        id: item.id,
        name: item.product_details.name,
        price: parseFloat(item.product_details.price),
        quantity: item.quantity,
        totalPrice: parseFloat(item.product_details.price) * item.quantity,
        image: item.product_details.image,
      }));
      setCartItems(cartItemsData);
      setOfferCases(cartData.free_cases || 0); // Set offerCases from cart data
      setIsCartFetched(true);
      calculateDeliveryCharge(cartItemsData); // Calculate the delivery charge when items are fetched
    } catch (err) {
      console.error("Error fetching cart items:", err);
      toast.error("Failed to fetch cart items.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDeliveryCharge = (cartItems: any[]) => {
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    let charge = 0;
    if (totalQuantity >= 25) {
      charge = 0;
    } else {
      charge = 19.99;
    }

    setDeliveryCharge(charge); // Update the delivery charge state
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDeliveryMethod(e.target.value);
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handlePromoApply = () => {
    console.log("Promo Code Applied:", promoCode);
    toast.info(`Promo code "${promoCode}" applied!`);
  };

  const handleContinue = async () => {
    try {
      setIsLoading(true);

      const orderData = {
        cart_id: cartId,
        shipping_id: shippingAddress.id,
        delivery_method: selectedDeliveryMethod,
        promo_code: promoCode,
        delivery_charge: deliveryCharge,
        total_amount: (
          cartItems.reduce((total, item) => total + item.totalPrice, 0) +
          (deliveryCharge || 0)
        ).toFixed(2),
      };

      const response = await axiosInstance.post("v1/order/", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        setIsOrderPlaced(true);
        toast.success("Thank you for your order! You will receive a confirmation email shortly.");
        navigate("/order-confirmation", { state: { orderId: response.data.id } });
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.totalPrice, 0);
    return (subtotal + (deliveryCharge || 0)).toFixed(2);
  };

  if (!cartId || !userId) {
    return <p>Missing cart or user information.</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-40">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Customer & Delivery Details</h2>
              {shippingAddress ? (
                <div>
                  <p className="text-sm text-gray-600">
                    {shippingAddress.first_name} {shippingAddress.last_name}
                  </p>
                  <p className="text-sm text-gray-600">{shippingAddress.email}</p>
                  <p className="text-sm text-gray-600">
                    {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postal_code},{" "}
                    {shippingAddress.country}
                  </p>
                  <p className="text-sm text-gray-600">{shippingAddress.phone}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-600">No shipping information available.</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Delivery Method</h3>
              <form className="space-y-4">
                <label className="flex items-center justify-between border p-4 rounded-lg cursor-pointer">
                  <div>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="Standard"
                      checked={selectedDeliveryMethod === "Standard"}
                      onChange={handleDeliveryChange}
                      className="form-radio text-blue-600 mr-4"
                    />
                    <span className="text-gray-800">Standard Delivery</span>
                    <p className="text-sm text-gray-500">Based on total quantity of items</p>
                  </div>
                  <span className="font-bold text-gray-800">
                    ${deliveryCharge !== null ? deliveryCharge.toFixed(2) : "Calculating..."}
                  </span>
                </label>
              </form>
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              disabled={isLoading || isOrderPlaced}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Continue"}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>

            {isLoading ? (
              <p>Loading cart items...</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg mr-4"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800">${item.totalPrice.toFixed(2)}</p>
                </div>
              ))
            )}

            {offerCases > 0 && (
              <div className="my-4 p-3 bg-green-100 text-green-800 rounded-lg">
                <p className="text-sm font-semibold">
                  Special Offer: You qualify for {offerCases} free case{offerCases > 1 ? "s" : ""}!
                </p>
              </div>
            )}

            <div className="border-t pt-6 space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Subtotal:</p>
                <p className="text-sm text-gray-800">
                  $
                  {cartItems.reduce((total, item) => total + item.totalPrice, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Delivery:</p>
                <p className="text-sm text-gray-800">
                  ${deliveryCharge !== null ? deliveryCharge.toFixed(2) : "Calculating..."}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Sales Tax:</p>
                <p className="text-sm text-gray-800">$0.00</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p>
                  $
                  {calculateTotalAmount()}
                </p>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              <span role="img" aria-label="lock">🔒</span> Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSummary;
