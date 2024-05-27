import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Employee = () => {
  let { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [update, setUpdate] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:3006/employees/getEmployeeById/${id}`)
      .then(function (response) {
        console.log(response.data);
        setEmployee(response.data);
        console.log("Employee:", employee);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`http://localhost:3006/attendances/getAttendancesByEmployeeId/${id}`)
      .then(function (response) {
        console.log(response.data);
        setAttendances(response.data);
        console.log("Attendancies:", attendances);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [update]);

  return (
    <div className="flex h-full w-full p-20">
      <div className="flex flex-col items-center w-1/2 h-3/4 shadow-2xl rounded-2xl ">
        <div className="flex flex-col items-center pb-10">
          <span className="flex items-end w-40 h-60 bg-green-600  rounded-b-full">
            <span className="flex  border-2 border-green-600 items-center justify-center bg-white w-40 h-40 p-10 rounded-full">
              <FaRegUser size={50} />
            </span>
          </span>
          <span className="text-2xl font-bold"> {employee.name} </span>
          <span className="font-bold">{employee.position} </span>
        </div>

        <div className="flex flex-col bg-green-600 text-white w-full h-full  px-20 py-10 rounded-b-2xl">
          <div className="flex justify-between">
            <span className="text-lg font-bold">Employee Id: </span>{" "}
            <span className="text-lg font-bold">{employee.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lg font-bold">Site: </span>{" "}
            <span className="text-lg font-bold">{employee.site}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-lg">Address: </span>{" "}
            <span className=" text-lg font-bold">{employee.address}</span>
          </div>
          <div className="flex justify-between">
            {" "}
            <span className="font-bold text-lg">Phone Number: </span>{" "}
            <span className="text-lg font-bold">{employee.phoneNumber}</span>
          </div>
        </div>
      </div>

      <div className="flex relative flex-col gap-10 items-center w-1/2">
        <div className="font-bold text-3xl">Attendances</div>
        <div className="flex flex-col gap-4 w-full px-4">
          {attendances.map((item, index) => {
            return (
              <div className="flex p-1 shadow-md rounded-xl justify-evenly border-2 border-t-gray-400 border-r-gray-400 w-full  ">
                <div className="flex flex-col gap-1 items-start">
                  {" "}
                  <span className="text-lg font-bold">Date: </span>
                  <span className="text-md font-bold"> {item.date}</span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  {" "}
                  <span className="text-lg font-bold">Time In: </span>
                  <span className="flex gap-2 text-md font-bold items-center">
                    {" "}
                    <span className="bg-green-600 rounded-full w-2 h-2"></span>
                    {item.timeIn}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  {" "}
                  <span className=" text-lg font-bold "> Time Out </span>
                  <span className="flex gap-2 text-md font-bold items-center">
                    <span className="bg-red-600 rounded-full w-2 h-2"></span>
                    {item.timeOut}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  {" "}
                  <span className=" text-lg font-bold "> Total hours</span>
                  <span className="flex gap-2 text-md font-bold items-center">
                    N/a
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Employee;
