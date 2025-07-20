import React from "react";
import UserSidebar from "../sidebar/userSidebar";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="flex">
      <UserSidebar />
      <div className="ml-20 md:ml-64 p-4 flex-1 mt-15">
        <Outlet /> {/* Will render user pages */}
      </div>
    </div>
    </>
  );
};

export default UserLayout;
