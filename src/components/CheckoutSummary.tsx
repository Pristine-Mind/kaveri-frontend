import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSpinner } from "react-icons/fa";

const OPENCAGE_API_KEY = "4fa04ade57694ff799098c2aadeec3c8";

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;
  const R = 3958.8;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const CheckoutSummary: React.FC = () => {
  const navigate = useNavigate();
  const { userId, cartId, token } = useContext(AuthContext);

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("Standard");
  const [promoCode, setPromoCode] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState<number | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
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

  const fetchCoordinates = async (address: string) => {
    try {
      const response = await axiosInstance.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q: address,
          key: OPENCAGE_API_KEY,
        },
      });
      if (response.data.results.length === 0) {
        throw new Error("No results found for the given address.");
      }
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      toast.error("Failed to fetch coordinates for address.");
      return { lat: 0, lng: 0 };
    }
  };

  const fetchShippingAddress = async () => {
    try {
      const response = await axiosInstance.get(`v1/shipping/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShippingAddress(response.data);
      calculateDeliveryCharge(response.data);
    } catch (error: any) {
      console.error("Error fetching shipping address:", error);
      toast.error("Failed to fetch shipping address.");
    }
  };

  const calculateDeliveryCharge = async (address: any) => {
    try {
      const storeAddress = "76111 Haltom City, Dallas, TX";
      const customerAddress = `${address.address}, ${address.city}, ${address.state}, ${address.postal_code}`;

      const storeCoords = await fetchCoordinates(storeAddress);
      const customerCoords = await fetchCoordinates(customerAddress);

      const calculatedDistance = calculateDistance(
        storeCoords.lat,
        storeCoords.lng,
        customerCoords.lat,
        customerCoords.lng
      );

      setDistance(calculatedDistance);

      let charge = 0;
      if (calculatedDistance <= 10) {
        charge = 15;
      } else if (calculatedDistance <= 20) {
        charge = 30;
      } else if (calculatedDistance <= 30) {
        charge = 45;
      } else if (calculatedDistance <= 50) {
        charge = 70;
      } else {
        charge = 100;
      }

      setDeliveryCharge(charge);
    } catch (error) {
      console.error("Error calculating delivery charge:", error);
      toast.error("Failed to calculate delivery charge.");
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
    } catch (err) {
      console.error("Error fetching cart items:", err);
      toast.error("Failed to fetch cart items.");
    } finally {
      setIsLoading(false);
    }
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
                    <p className="text-sm text-gray-500">Based on provided distance</p>
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

            <div className="mb-6">
              <label htmlFor="promoCode" className="text-sm font-medium text-gray-800 block mb-2">
                Enter a Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promoCode"
                  name="promoCode"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none"
                />
                <button
                  onClick={handlePromoApply}
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-r-lg hover:bg-gray-400 transition"
                >
                  Apply
                </button>
              </div>
            </div>

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
                  {(
                    cartItems.reduce((total, item) => total + item.totalPrice, 0) +
                    (deliveryCharge || 0)
                  ).toFixed(2)}
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

