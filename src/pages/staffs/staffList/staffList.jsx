import React, { useEffect, useState } from 'react';
import API from '../../../api/axiosInstance';
import Table from '../../../components/Table/Table';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StaffList = () => {
  const [staffList, setStaffList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 const handleAddStaff = () => {
    navigate('/staff/register');
  };

  
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await API.delete(`staff/delete/${id}/`);
      setStaffList(prev => prev.filter(staff => staff.id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Staff has been removed.",
        showConfirmButton: false
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to remove staff. Please try again.",
      });
    }
  }
};

  const fetchStaffList = async () => {
    try {
      const res = await API.get('staffs/list/');
      const staffList = res.data?.data || res.data || [];
      setStaffList(staffList);
    } catch (error) {
      setError('Failed to fetch staff');
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchStaffList();
  }, []);

  const columns = [
    { title: 'Username', key: 'username' },
    { title: 'First Name', key: 'first_name' },
    { title: 'Last Name', key: 'last_name' },
    { title: 'Email', key: 'email' },
    { title: 'Mobile Number', key: 'mobile_number' },
    { title: 'Address', key: 'address' },
      {
    title: 'Actions',
    key: 'actions',
    render: (row) => (
      <button
        onClick={() => handleDelete(row.id)}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        Remove
      </button>
    )
  }

  ];

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-sm ">
      <h1 className="text-3xl font-bold text-cyan-800">Staff List</h1>
      {error && <div className="text-red-500">{error}</div>}
        <button
          onClick={handleAddStaff}
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg shadow-md transition ml-[88%]"
        >
          + Add Staff
        </button>
      <div className="mt-4">
        <Table columns={columns} data={staffList} />
      </div>
    </div>
  );
};

export default StaffList;

