import React from "react";

interface SelectMenuProps {
  options: string[];
}

const SelectMenu: React.FC<SelectMenuProps> = ({ options }) => {
  return (
    <select className="bg-black text-white outline-none border-none cursor-pointer text-sm">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectMenu;
