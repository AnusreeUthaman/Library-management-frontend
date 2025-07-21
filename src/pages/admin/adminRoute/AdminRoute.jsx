import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import API from '../../../api/axiosInstance';
import Swal from 'sweetalert2';

const AdminRoute = () => {
  const [adminExists, setAdminExists] = useState(null);

  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const res = await API.get('check/admin/');
        setAdminExists(res.data.admin_exists);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: 'Please try again later',
        });
      }
    };

    checkAdminExists();
  }, []);

  if (adminExists === null) {
    return <div>Loading...</div>;
  }

  return adminExists ? <Navigate to="/" /> : <Outlet />;
};

export default AdminRoute;