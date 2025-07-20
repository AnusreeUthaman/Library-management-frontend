import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () =>{
  // const role = localStorage.getItem("role") || "user";

    return(
    <div className="flex">
      <Sidebar />
      <div  className="ml-20 md:ml-64 p-4 flex-1">
        <Outlet /> {/* Will render the page component */}
      </div>
    </div>
    );
};

export default Layout;