import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaBars,FaHome,FaUserEdit,FaSignOutAlt,FaLock,FaBookReader,FaBookmark} from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { MdPassword } from "react-icons/md";

const UserSidebar = () => {
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
          className={`fixed top-0 left-0 h-full md:w-58 transition-width duration-300 text-gray-700 border rounded-xl border-gray-100 ml-2 shadow-xl mt-15
            ${isOpen ? "w-40" : "w-20"}`}
        >
          <div className="flex justify-between items-center px-4">
            <h2
              className={`text-2xl font-bold mt-4 ${isOpen ? "block" : "hidden"}`}
            >
              Library
            </h2>
            <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <IoCloseSharp size={22} /> : <FaBars size={22} />}
            </button>
          </div>
          

          <nav className="mt-4">
            <ul>
              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/user/dashboard")}
              >
                <FaHome size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Home</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/user/booking/list")}
              >
                <FaBookmark size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>My Bookings</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/user/profile")}
              >
                
                <FaUserEdit size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Profile</span>
              </li>
              <li
                className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => navigate("/user/borrowing/history")}
              >
                <FaBookReader size={22} />
                <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Borrowings</span>
              </li>
              <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/user/change/password")}>
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

export default UserSidebar;
