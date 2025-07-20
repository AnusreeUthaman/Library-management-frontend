import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../sidebar/StaffSidebar";

const StaffLayout = () =>{
  // const role = localStorage.getItem("role") || "user";

    return(
    <div className="flex">
      <StaffSidebar />
      <div  className="ml-20 md:ml-64 p-4 flex-1">
        <Outlet /> {/* Will render the page component */}
      </div>
    </div>
    );
};

export default StaffLayout;