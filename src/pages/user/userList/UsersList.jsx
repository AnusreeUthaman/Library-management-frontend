
import React, { useState, useEffect } from "react";
import API from "../../../api/axiosInstance";
import Table from "../../../components/Table/Table";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  
  const columns = [
    { title: "Username", key: "username" },
    { title: "First Name", key: "first_name" },
    { title: "Last Name", key: "last_name" },
    { title: "Email", key: "email" },
    { title: "Mobile Number", key: "mobile_number" },
    { title: "Status", key: "status" },
    { title: "Action", key: "action" },
  ];


  const fetchUsers = async () => {
    try {
      const response = await API.get("users/list/");
      const formatted = response.data.data.map((user) => {
        const isActive = user.is_active;

        return {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          mobile_number: user.mobile_number,
          status: (
            <span 
              className={`px-3 py-1  text-sm font-semibold  ${
                isActive ? "bg-green-100 text-green-900" : "bg-red-100 text-red-800"
              }`}
            >
              {isActive ? "Active" : "Blocked"}
            </span>
          ),
          action: (
            <div className="flex space-x-2">
              {isActive ? (
                <button
                  onClick={() => handleBlock(user.id)}
                  className="bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700"
                >
                  Block
                </button>
              ) : (
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="bg-green-600 text-white rounded px-3 py-1 hover:bg-green-700"
                >
                  Unblock
                </button>
              )}
            </div>
          ),
        };
      });

      setUsers(formatted);
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.detail || "Something went wrong",
        "error"
      );
    }
  };

 
  const handleBlock = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Block",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        await API.post(`user/${id}/block/`);
        Swal.fire("Blocked!", "User has been blocked.", "success");
        console.log("Blocking user ID:", id);
        fetchUsers(); // Refresh 
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.error || "Failed to block user.",
          "error"
        );
      }
    }
  };

 
  const handleUnblock = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure you want to unblock this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Unblock",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        await API.post(`user/${id}/block/`);
        Swal.fire("Unblocked!", "User has been unblocked.", "success");
        fetchUsers(); 
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.error || "Failed to unblock user.",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-sm ">
      <h1 className="text-3xl font-bold p-4 text-cyan-800">Users List</h1>
      <Table columns={columns} data={users} />
    </div>
  );
};

export default UsersList;
