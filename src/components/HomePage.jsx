import React, { useEffect, useState } from "react";
import employee1 from "../assets/employee1.png";
import employee2 from "../assets/employee2.png";
import { AiFillCalendar } from "react-icons/ai";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const HomePage = () => {
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
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:3006/attendances/dailyAttendance")
      .then(function (response) {
        console.log(response.data);
        setAttendencisList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [attendenciesList, setAttendencisList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const absent = employeeList.length - attendenciesList.length;
  const onDuty = attendenciesList.length;

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(attendenciesList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(blob, "exportedData.xlsx");
  };

  return (
    <div className="flex relative flex-col gap-10 h-full p-10">
      <div className="flex  p-5 rounded-xl gap-3 w-full ">
        <span className="flex flex-col w-1/4 items-center gap-4 bg-gray-100 rounded-lg shadow-inner">
          <div className="flex flex-col gap-1 -ml-32">
            <span className="text-2xl font-bold">My Team</span>{" "}
            <span className="text-sm font-bold">Friday, 7 March 2024</span>
          </div>
          <span className="flex rounded-full bg-gray-100 w-32 h-32 justify-center items-center">
            68%
          </span>
        </span>{" "}
        <div className="flex flex-col bg-gray-100 shadow-inner rounded-lg w-3/4 p-2 gap-4 pb-1">
          <span className="text-xl font-bold">Atendance statistics</span>
          <div className="flex  w-full">
            <span className="flex flex-col bg-white rounded-lg w-1/4 m-1 justify-center items-center py-6 gap-4 shadow-sm">
              <AiFillCalendar size={30} />
              <span>On Duty</span>{" "}
              <span className="bg-gray-100 rounded-full p-4">{onDuty}</span>
            </span>
            <span className="flex flex-col bg-white rounded-lg w-1/4 m-1 justify-center items-center py-6 gap-4 shadow-sm">
              <AiFillCalendar size={30} />
              <span>On Time</span>{" "}
              <span className="bg-gray-100 rounded-full p-4">28</span>
            </span>{" "}
            <span className="flex flex-col bg-white rounded-lg w-1/4 m-1 justify-center items-center py-6 gap-4 shadow-sm">
              <AiFillCalendar size={30} />
              <span>Late</span>{" "}
              <span className="bg-gray-100 rounded-full p-4">28</span>
            </span>{" "}
            <span className="flex flex-col bg-white rounded-lg w-1/4 m-1 justify-center items-center py-6 gap-4 shadow-sm">
              <AiFillCalendar size={30} />
              <span>Absent</span>{" "}
              <span className="bg-gray-100 rounded-full p-4">{absent}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full ">
        <div>Attendances</div>
        <div className="flex w-full justify-between">
          <div className="flex gap-10">
            <span className=" border-2 border-green-600  gap-3  rounded-xl px-4 py-2">
              Site 1
            </span>
            <span className=" border-2 border-gray-200  gap-3  rounded-xl px-4 py-2">
              Site 2
            </span>
            <span className=" border-2 border-gray-200  gap-3  rounded-xl px-4 py-2">
              Site 3
            </span>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-300 outline-none text-gray-700 py-2 px-5 rounded-md mr-20 w-full"
            />
          </div>
        </div>
        <div className=" h-[2px] bg-gradient-to-r from-green-700 to-gray-100 mx-2 rounded-sm"></div>
        <div className="">
          <div className="flex flex-col gap-1">
            {attendenciesList.map((item, id) => {
              const pointer = item.EmployeeId - 1;
              const employee = employeeList[pointer];
              return (
                <>
                  <div className="flex  justify-between items-center justify-items-start ">
                    <div className="flex gap-4 items-center w-1/5">
                      <div className="flex items-center justify-center text-green-500 shadow-sm text-sm bg-gray-200 rounded-full p-3">
                        <FaRegUser size={30} />
                      </div>
                      <span className="flex flex-col gap-1 items-start">
                        <span className="text-xl font-bold">
                          {employee.name}
                        </span>{" "}
                        <span className="text-sm text-gray-400 font-bold">
                          {employee.position}
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold">Date</span>{" "}
                      <span className="flex items-center gap-2">
                        <span>{item.date}</span>
                      </span>{" "}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold">Check in</span>{" "}
                      <span className="flex items-center gap-2">
                        <span className="bg-green-600 rounded-full w-2 h-2"></span>{" "}
                        <span>{item.timeIn}</span>
                      </span>{" "}
                    </div>

                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold">Check out</span>{" "}
                      <span className="flex items-center gap-2">
                        <span className="bg-red-600 rounded-full w-2 h-2"></span>{" "}
                        <span>{item.timeOut}</span>
                      </span>{" "}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xl font-bold">Total hours</span>{" "}
                      <span className="flex items-center gap-2">
                        <span>{item.timeOut}</span>
                      </span>{" "}
                    </div>
                  </div>
                  <div className=" h-[1px] bg-gradient-to-r from-green-700 to-gray-100 mx-10 rounded-sm mt-2 mb-2"></div>
                </>
              );
            })}
          </div>
        </div>
        <div
          onClick={exportToExcel}
          className="flex fixed bottom-20 right-20 bg-green-600 text-white font-bold p-2 rounded-lg"
        >
          Generate excel{" "}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
