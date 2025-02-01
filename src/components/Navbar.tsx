import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import UserIcons from "./UserIcons";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#717581] w-full px-6 py-5 flex items-center justify-between shadow-md fixed top-0 left-0 z-20">
      <div className="flex items-center space-x-8">
        <Link to="/" onClick={closeMenu}>
          <Logo />
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavItem title="About Us" href="/about-us" />
          <NavItem title="Beer" href="/beers" />
          <NavItem title="Beer Club" href="/beer-club" />
          <NavItem title="Contact" href="/contact" />
          <NavItem title="Partners" href="/partners" />
          <NavItem title="Stores" href="/stores" />
        </div>
      </div>

      <div className="hidden md:flex flex-grow max-w-md mx-4">
        <SearchBar />
      </div>

      <div className="flex items-center space-x-4">
        <UserIcons />

        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none md:hidden"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-black md:hidden flex flex-col items-center space-y-4 p-6 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <NavItem title="About Us" href="/about-us" onClick={closeMenu} />
        <NavItem title="Beer" href="/beers" onClick={closeMenu} />
        <NavItem title="Beer Club" href="/beer-club" onClick={closeMenu} />
        <NavItem title="Contact" href="/contact" onClick={closeMenu} />
        <NavItem title="Partners" href="/partners" onClick={closeMenu} />
        <NavItem title="Stores" href="/stores" onClick={closeMenu} />

        <div className="w-full">
          <SearchBar />
        </div>

        <UserIcons />
      </div>
    </nav>
  );
};

export default Navbar;
