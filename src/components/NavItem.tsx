import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  title: string;
  href: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, href, onClick }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="text-white hover:text-gray-300 transition-colors"
    >
      {title}
    </Link>
  );
};

export default NavItem;
