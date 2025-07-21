import React, { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import NotificationBell from '../pages/notification/NotificationBell';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IoLibrary } from 'react-icons/io5';

const Navbar = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/user/profile/');
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user profile');
      }
    };
    fetchUser();
  }, []);


  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-yellow-300 shadow-md">
      <IoLibrary size={26} className='text-cyan-950 '/>
      <h1 className="text-2xl font-bold text-cyan-950 font-mono block mr-275 mt-1">LibriSphere</h1>

      <div className="flex items-center gap-8 relative">
        <NotificationBell />

        <div
          onClick={() => navigate("/user/profile")}
          className="flex items-center gap-2 cursor-pointer"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-500 " />
          )} 
           <span className="text-gray-600 font-medium font-serif ">{user?.username}</span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
