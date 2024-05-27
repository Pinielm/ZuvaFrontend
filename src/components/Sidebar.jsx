import React from "react";
import logo from "../assets/zuva.png";
import { Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsFillHouseFill } from "react-icons/bs";
import { AiFillCalendar } from "react-icons/ai";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2 p-2 w-1/6 h-screen shadow-xl ">
      <img className="w-40 h-20 mb-20 mt-10" src={logo} />
      <Link
        to="/"
        className="flex border-2 m-3 border-green-600  gap-3 items-center justify-center rounded-xl p-2"
      >
        <BsFillHouseFill size={30} />
        <span className="font-bold">Homepage</span>
      </Link>
      <Link
        to="/employees"
        className="flex border-2 m-3 border-green-600  gap-3 items-center justify-center rounded-xl p-2"
      >
        <BsFillPeopleFill size={30} />
        <span className="font-bold">Employees</span>
      </Link>
      <Link
        to="/attendances"
        className="flex border-2 m-3 border-green-600 gap-2 items-center justify-center rounded-xl p-2 "
      >
        <AiFillCalendar size={30} />
        <span className="font-bold">Attendance</span>
      </Link>
    </div>
  );
};

export default Sidebar;
