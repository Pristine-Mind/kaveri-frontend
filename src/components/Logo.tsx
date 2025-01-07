import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link to="/">
        <img
          src={logo}
          alt="Kaveri Logo"
          className="w-1000 h-12"
        />
      </Link>
    </div>
  );
};

export default Logo;
