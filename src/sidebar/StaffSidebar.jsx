import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaBars,FaHome,FaUserEdit,FaShareSquare,FaSignOutAlt,FaLock,FaBookReader,FaReply} from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdPassword } from "react-icons/md";

const StaffSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <>
      <div className="flex">
        <div
          className={`fixed top-0 left-0 h-full md:w-58 transition-width duration-300 text-gray-700 border rounded-xl border-gray-100 ml-2 shadow-xl
            ${isOpen ? "w-40" : "w-20"}`}
        >
          <div className="flex justify-between items-center px-4">
            <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <IoCloseSharp size={22} /> : <FaBars size={22} />}
            </button>
          </div>
          
          <nav className="mt-4">
            <ul>
            <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/staff/dashboard")}>
                <FaHome size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Home</span>
              </li>
            <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/staff/issue/book")}
              >
                <FaShareSquare size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Issue Books</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/staff/borrowing/list")}
              >
                <FaBookReader size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Borrowing List</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/borrowing/return")}
              >
                <FaReply size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Book Returns</span>
              </li>
              <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/staff/profile")}>
                <FaUserEdit size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Profile</span>
              </li>
              <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/staff/change/password")}>
              < MdPassword size={22} />
                  <span className={`ml-4 md:block 
                      ${isOpen ? "block" : "hidden"}`}>
                    Change Password
                  </span>
              </li>

              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={22} />
                <span className={`ml-4 md:block text-red-600 ${isOpen ? "block" : "hidden"}`}>Log out</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default StaffSidebar;
