import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars,FaUserTie, FaHome,FaFlag, FaUndo ,FaExclamationTriangle, FaSignOutAlt,FaBook, FaPenNib, FaTags,FaUserFriends, FaLock,FaChevronDown, FaChevronUp,FaClipboardList, FaExchangeAlt} from "react-icons/fa";
import { IoCloseSharp } from 'react-icons/io5';
import { MdPassword } from "react-icons/md";

const Sidebar = () =>{

    const navigate = useNavigate();
    const [isOpen,setIsOpen] = useState(true)
    const [manageBooksOpen, setManageBooksOpen] = useState(false);
 
    return(
        <>
        
        <div className=" flex" >
            <div
                className={`fixed top-0 left-0 h-full md:w-58 transition-width duration-300 text-gray-700 border rounded-2xl border-gray-100 ml-2 shadow-xl
                    ${isOpen ? 'w-40' : 'w-20'}  max-h-screen bg-white`}
            >
            <div className="flex justify-between items-center px-4">
                <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IoCloseSharp size={22}/>  : <FaBars size={22}/>}
                </button>
            </div>
            <nav className="mt-4">
                <ul>
                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/admin/dashboard")}>
                       <FaHome size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                            Home
                        </span>
                    </li>
                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/staffs/list")}>
                        <FaUserTie size={22} className="text-blue-950" />
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                                Manage Staffs
                            </span>
                    </li>
                    <li className="flex items-center justify-between p-4 hover:bg-gray-200 cursor-pointer" onClick={() => setManageBooksOpen(!manageBooksOpen)}>
                    <div className="flex items-center">
                        <FaBook size={22} className="text-blue-950" />
                        <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>
                        Manage Books
                        </span>
                    </div>
                    {isOpen && (
                        <span className="mr-5 mt-2">
                        {manageBooksOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14}  />}
                        </span>
                    )}
                    </li>
                    {/* Dropdown  */}
                    {manageBooksOpen && (
                    <>
                        <li className="flex items-center pl-10 p-3 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/list")}>
                        <FaBook size={16} className="text-blue-950" />
                        <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>Books List</span>
                        </li>
                        <li className="flex items-center pl-10 p-3 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/add/book")}>
                        <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}> ✚ Add Book</span>
                        </li>
                        <li className="flex items-center pl-10 p-3 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/authors")}>
                            <FaPenNib size={16} className="text-blue-950" />
                        <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>Authors</span>
                        </li>
                        <li className="flex items-center pl-10 p-3 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/genres")}>
                            <FaTags size={16} className="text-blue-950" />
                        <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>Genres</span>
                        </li>

                    </>
                    )}
                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/users/list")}>
                    <FaUserFriends size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                          Manage Users 
                        </span>
                    </li>

                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/booking/list")}>
                    <FaClipboardList size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                          Booking list
                        </span>
                    </li>
                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/borrowing/list")}>
                    < FaExchangeAlt size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                          Borrowing list
                        </span>
                    </li>

                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/overdue/books")}>
                    <FaExclamationTriangle size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                          Overdue Books
                        </span>
                    </li>
                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/flagged/books")}>
                    <FaFlag size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                          Flagged Books
                        </span>
                    </li>

                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer" onClick={() => navigate("/change/password")}>
                    <  MdPassword size={22} className="text-blue-950"/>
                        <span className={`ml-4 md:block 
                            ${isOpen ? "block" : "hidden"}`}>
                          Change Password
                        </span>
                    </li>

                    <li className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"  onClick={() => navigate("/logout")}>
                        <FaSignOutAlt size={22} className="text-red-700" />
                        <span className={`ml-4 md:block text-red-700
                            ${isOpen ? "block" : "hidden"}`}>
                            Log out
                        </span>
                    </li>

                </ul>
            </nav>
            
            {/* <div className="ml-20 md:ml-64 p-8 min-h-screen flex-1">
                <h2></h2>
            </div> */}
            </div>
        </div>
        </>
    )

}
export default Sidebar;