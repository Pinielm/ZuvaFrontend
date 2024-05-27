import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";

const Attendances = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3006/employees/allEmployees")
      .then(function (response) {
        console.log(response.data);
        setEmployeeList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:3006/attendances/allAttendances")
      .then(function (response) {
        console.log(response.data);
        setAttendenciesList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [attendenciesList, setAttendenciesList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  return (
    <div>
      <div className="flex justify-between py-4 px-2">
        <span className="ml-10 font-bold text-2xl">Attendances</span>{" "}
        <input
          type="text"
          placeholder="Search employee"
          className="bg-gray-300 py-2 px-5 rounded-md mr-20 w-2/5"
        />
      </div>
      <div className="flex flex-col gap-5 p-4">
        {attendenciesList.map((item, id) => {
          const pointer = item.EmployeeId - 1;
          const employee = employeeList[pointer];
          return (
            <div className="flex p-4 shadow-md rounded-xl justify-evenly border-2 border-t-gray-400 border-r-gray-400 hover:py-5 ">
              <div className="flex items-center justify-center text-green-500 shadow-sm text-sm bg-gray-200 rounded-full p-3">
                <FaRegUser size={30} />
              </div>
              <div className="flex flex-col gap-2 justify-items-start w-1/5">
                <span className="font-bold text-xs">{employee.name}</span>
                <span className="font-bold ">{employee.position}</span>
              </div>
              <div className="flex flex-col gap-2 justify-items-start w-1/5">
                <span className="font-bold text-xs">Date:</span>
                <span>{item.date}</span>
              </div>
              <div className="flex flex-col gap-2 justify-items-start w-1/5">
                <span className="font-bold text-xs">Time In:</span>
                <span>{item.timeIn}</span>
              </div>
              <div className="flex flex-col gap-2 justify-items-start w-1/5">
                <span className="font-bold text-xs">Time Out</span>
                <span>{item.timeOut}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Attendances;
