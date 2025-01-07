import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  title: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, href }) => {
  return (
    <Link to={href} className="text-white hover:text-gray-300 transition-colors">
      {title}
    </Link>
  );
};

export default NavItem;
