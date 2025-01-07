import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import logo from '/src/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#717581] text-white py-0">
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-6 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="Kaveri Logo"
              className="w-40 h-20 mr-2"
            />
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/people/Kaveri-International/61565650737421/" className="text-gray-300 hover:text-yellow-500">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/kaveri.international/?fbclid=IwY2xjawFhIT1leHRuA2FlbQIxMAABHWJ9Dfc4PiaGgcIKGkXPv5fcSWJPzpMFuLB2rlFloCiVRitJ7ATq5h-S3Q_aem_RRKJZHfxFCwVp8u7QYSs7A" className="text-gray-300 hover:text-yellow-500">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@kaveriinternation?lang=en" className="text-gray-300 hover:text-yellow-500">
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-yellow-500 font-semibold mb-4">ABOUT Kaveri</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/about-us" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="/faq" className="hover:text-yellow-500">FAQ</a></li>
            <li><a href="/store-policy" className="hover:text-yellow-500">Store Policy</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-yellow-500 font-semibold mb-4">PRODUCTS</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/beers" className="hover:text-yellow-500">Beer</a></li>
            
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-yellow-500 font-semibold mb-4">SUPPORT</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/shipping-returns" className="hover:text-yellow-500">Shipping & Returns</a></li>
            <li><a href="/contact" className="hover:text-yellow-500">Contact Us</a></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-yellow-500 font-semibold mb-4">CONTACT US</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Tel: +1 832 684 3122</li>
            <li>Email: info@kaveri.com</li>
            <li>Haltom City, Texas, USA 76111</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
