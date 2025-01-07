import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-1 w-full">
      <input
        type="text"
        placeholder="Enter your keywords"
        className="outline-none text-black px-2 w-full"
      />
      <button className="text-gray-500">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
