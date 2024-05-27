import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import HomePage from "../src/components/HomePage";
import Employees from "../src/components/Employees";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Attendances from "./components/Attendances";
import Employee from "./components/Employee";

function App() {
  return (
    <Router>
      <div className="flex w-full h-screen text-green-600">
        <Sidebar />
        <div className="w-full">
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendances" element={<Attendances />} />
            <Route path="/employee/:id" element={<Employee />} />
          </Routes>
        </div>
      </div>{" "}
    </Router>
  );
}

export default App;
