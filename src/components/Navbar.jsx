import React from "react";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between py-10 px-3 w-full h-20 items-center shadow-xl">
      <span className="font-bold">Welcome</span>
      <div className="flex gap-8 mr-20">
        <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
          <FaRegBell size={30} />
        </div>

        <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
          <FaRegUser size={30} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
