import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Employee = () => {
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
  }, []);

  const initialValues = {
    name: "",
    position: "",
    site: "",
    phoneNumber: "",
    address: "",
  };
  const [formvalues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();
  const [employeeList, setEmployeeList] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formvalues, [name]: value });
    console.log(formvalues);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:3006/employees/addEmployee", formvalues)
      .then(function (response) {
        console.log(response.data);

        setIsOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {isOpen ? (
        <div className="flex relative flex-col w-full min-h-screen h-full pt-10">
          <div className="flex justify-between py-4 px-2">
            <span className="ml-10 font-bold text-2xl">Employees</span>{" "}
            <input
              type="text"
              placeholder="Search employee"
              className="bg-gray-300 outline-none text-gray-300 py-2 px-5 rounded-md mr-20 w-2/5"
            />
          </div>
          <div className="flex flex-col gap-5 p-4">
            {employeeList.map((item, id) => {
              return (
                <div
                  onClick={() => {
                    axios.post("http://localhost:3006/attendances/checkIn", {
                      EmployeeId: 1,
                    });
                    // axios.post("http://localhost:3006/attendances/checkOut", {
                    //   EmployeeId: 3,
                    // });
                    //navigate(`/employee/${item.id}`);
                  }}
                  className="flex p-4 shadow-md rounded-xl justify-evenly border-2 border-t-gray-400 border-r-gray-400 hover:py-5 "
                >
                  <div className="flex flex-col gap-2 justify-items-start w-1/5">
                    <span className="font-bold text-xs">Name:</span>
                    <span className="font-bold ">{item.name}</span>
                  </div>
                  <div className="flex flex-col gap-2 justify-items-start w-1/5">
                    <span className="font-bold text-xs">Position:</span>
                    <span>{item.position}</span>
                  </div>
                  <div className="flex flex-col gap-2 justify-items-start w-1/5">
                    <span className="font-bold text-xs">Addresss:</span>
                    <span>{item.address}</span>
                  </div>
                  <div className="flex flex-col gap-2 justify-items-start w-1/5">
                    <span className="font-bold text-xs">Phone number:</span>
                    <span>{item.phoneNumber}</span>
                  </div>

                  <span className="flex bg-green-500 font-bold py-1 rounded-xl px-3 text-white items-center">
                    Attendance sheet
                  </span>
                </div>
              );
            })}
          </div>
          <span
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex fixed bottom-40  right-60 text-white font-bold bg-green-600 w-40 place-self-end  shadow-2xl justify-center  py-4 rounded-md hover:cursor-pointer"
          >
            Add Employee
          </span>
        </div>
      ) : (
        <div className="flex  items-center justify-center h-full">
          <div className="flex flex-col w-2/3 shadow-2xl p-20 rounded-xl border-2 border-t-gray-400 border-r-gray-400 gap-4 place-items-center mb-40">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="bg-gray-200 py-3 px-6 rounded-md w-3/4 outline-none text-gray-700"
              value={formvalues.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              className="bg-gray-200 py-3 px-6 rounded-md w-3/4 outline-none text-gray-700"
              value={formvalues.position}
              onChange={handleChange}
            />
            <input
              type="text"
              name="site"
              placeholder="Site"
              className="bg-gray-200 py-3 px-6 rounded-md w-3/4 outline-none text-gray-700"
              value={formvalues.site}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone number"
              className="bg-gray-200 py-3 px-6 rounded-md w-3/4 outline-none text-gray-700"
              value={formvalues.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="bg-gray-200 py-3 px-6 rounded-md w-3/4 outline-none text-gray-700"
              value={formvalues.address}
              onChange={handleChange}
            />
            <span
              onClick={() => {
                handleSubmit();
              }}
              className="text-white font-bold bg-green-600 px-5 py-2 rounded-md hover:cursor-pointer"
            >
              Add Employee
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Employee;
