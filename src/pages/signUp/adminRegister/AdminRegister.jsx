import React from 'react';
import RegisterForm from '../../../components/registerForm/RegisterForm';


const AdminRegister = () => {
  return (
    <div>
      <RegisterForm submitUrl="admin/register/" role="admin" />
    </div>
  );
};

export default AdminRegister;
