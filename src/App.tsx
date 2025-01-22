import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from "./components/Navbar";
import ProductList from './components/ProductList';
import HeroSection from './components/HeroSection';
import ProductCategories from './components/ProductCategories';
import Footer from './components/Footer';
import BeerClub from './components/BeerClub';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Register from './components/Register';
import Wishlist from './components/Wishlist';
import About from './components/About';
import ProductDetails from './components/ProductDetails';
import ProductAll from './components/ProductAll';
import ShippingAndReturns from './components/ShippingAndReturns';
import FAQ from './components/FAQ';
import Cart from './components/Cart';
import Login from './components/Login';
import Checkout from './components/Checkout';
import StorePolicy from './components/StorePolicy';
import CheckoutSummary from './components/CheckoutSummary';
import Profile from './components/Profile';
import Partners from './components/Partners';
import OrderConfirmation from './components/OrderConfirmation';
import Store from './components/StoreLocationComponent'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { WishlistProvider } from './components/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AxiosInterceptor } from './api/axiosInstance';

import AgeGateModal from './components/AgeGateModal';

const App: React.FC = () => {
  // State to control whether the modal is open
  const [isAgeGateOpen, setIsAgeGateOpen] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      mirror: false,
    });

    // Check localStorage on mount to see if the user has verified their age before
    // const verified = localStorage.getItem('ageVerified');
    // if (verified === 'true') {
    //   setIsAgeGateOpen(false);
    // }
  }, []);

  // Callback to close the Age Gate modal once user is verified
  const handleAgeVerified = () => {
    // localStorage.setItem('ageVerified', 'true');
    setIsAgeGateOpen(false);
  };

  return (
    <AuthProvider>
      <AxiosInterceptor>
        <WishlistProvider>
          <Router>
            {/* Render the Age Gate Modal if it is open */}
            {isAgeGateOpen && (
              <AgeGateModal onVerified={handleAgeVerified} />
            )}

            {/* Show the rest of the app only if the user has passed the age gate */}
            {!isAgeGateOpen && (
              <>
                <Navbar />
                <div className="content">
                  <Routes>
                    {/* Home Route */}
                    <Route
                      path="/"
                      element={
                        <>
                          <HeroSection data-aos="fade-down" />
                          <About />
                          <ProductCategories data-aos="fade-up" />
                          <ProductList data-aos="fade-up" />
                        </>
                      }
                    />

                    {/* Beer Club Route */}
                    <Route path="/beer-club" element={<BeerClub />} />

                    {/* About Us Route */}
                    <Route path="/about-us" element={<AboutUs />} />

                    {/* Contact Us Route */}
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/stores" element={<Store />} />
                    {/* Register and Login Routes */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/partners" element={<Partners />} />

                    {/* Product All Route  */}
                    <Route path="/beers" element={<ProductAll />} />

                    {/* Wishlist Route */}
                    <Route path="/wishlist" element={<Wishlist />} />

                    {/* Product Details Route */}
                    <Route path="/product/:id" element={<ProductDetails />} />

                    {/* Shipping and Returns Route */}
                    <Route path="/shipping-returns" element={<ShippingAndReturns />} />

                    {/* FAQ Route */}
                    <Route path="/faq" element={<FAQ />} />

                    {/* Cart Route */}
                    <Route path="/cart" element={<Cart />} />

                    {/* Profile Route (Protected) */}
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      }
                    />

                    {/* Checkout Routes (Protected) */}
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout-summary"
                      element={
                        <ProtectedRoute>
                          <CheckoutSummary />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/order-confirmation"
                      element={
                        <ProtectedRoute>
                          <OrderConfirmation />
                        </ProtectedRoute>
                      }
                    />

                    {/* Store Policy Route */}
                    <Route path="/store-policy" element={<StorePolicy />} />
                  </Routes>
                </div>
              </>
            )}
            <Footer />
            <ToastContainer />
          </Router>
        </WishlistProvider>
      </AxiosInterceptor>
    </AuthProvider>
  );
};

export default App;
