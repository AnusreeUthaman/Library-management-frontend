import React from "react";
import API from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const RegisterForm = ({submitUrl,role}) =>{

  const navigate = useNavigate(); 

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string()   
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one symbol')
        .required('Password is required'),
        first_name: role !== 'admin' ? Yup.string().required('First name is required') : Yup.string(),
        last_name: role !== 'admin' ? Yup.string().required('Last name is required') : Yup.string(),
        email: role !== 'admin' ? Yup.string().email().required('Email is required') : Yup.string(),
        mobile_number: role !== 'admin' ? Yup.string().required('Mobile number is required') : Yup.string(),
        address: role !== 'admin' ? Yup.string().required('Address is required') : Yup.string(),
        membership_type: role === 'user' ? Yup.string().required('Membership type is required') : Yup.string(),
  });

   const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      mobile_number: '',
      address: '',
      membership_type: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      let submitData= { ...values };

      if (role === 'admin') {
        submitData = { 
            username: values.username, 
            password: values.password 
        };
      } else if (role === 'staff') {
        delete submitData.membership_type;
      }

    try{
        const res = await API.post(submitUrl,submitData)
        Swal.fire("Success", res.data.message, "success")
        if (role === 'staff') {
          navigate('/staffs/list');
        } else if(role === 'admin' || role=== 'user') {
          navigate('/');
        }
        } catch (err) {
          Swal.fire('Something went wrong!');
        }
        }
  });
    return(
      <div > 
        
        <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} className='max-w-md mx-auto p-6 mt-10 border border-gray-200 rounded-xl shadow-md'>

        {role === 'admin' && (
          <div className="text-3xl text-blue-500 text-center mb-4"> Admin Registration </div>
        )}
        {role === 'staff' && (
          <div className="text-3xl text-blue-500 text-center mb-4">Add Staff </div>
        )}
        {role === 'user' && (
          <div className="text-2xl text-blue-500 text-center mb-4">Create an Account</div>
        )}
          
      <input 
        name="username"
        placeholder="Username" 
        value={formik.values.username} 
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200 mr-12 ml-10 "
      /> <br />
      {formik.touched.username && formik.errors.username && 
        <div className='text-red-500 text-sm text-center'>{formik.errors.username}</div>
      }
      <br />
      <input
        name="password" 
        placeholder="Password" 
        type="password" 
        value={formik.values.password} 
        onChange={formik.handleChange} 
        className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200  ml-10"
      /> <br />
      {formik.touched.password && formik.errors.password && 
        <div className='text-red-500 text-sm text-center'>{formik.errors.password}</div>
      }
      <br />
      {role !== 'admin' && (
        <>
          <input 
            name="first_name"
            placeholder="First Name"
            value={formik.values.first_name} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200  ml-10" 
          /> <br />
          {formik.touched.first_name && formik.errors.first_name && 
            <div className='text-red-500 text-sm text-center'>{formik.errors.first_name}</div>
          }
          <br />
          <input
            name="last_name" 
            placeholder="Last Name" 
            value={formik.values.last_name} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200  ml-10"
          /><br />
          {formik.touched.last_name && formik.errors.last_name && 
            <div className='text-red-500 text-sm text-center'>{formik.errors.last_name}</div>
          }
          <br />
          <input 
            name="email" 
            placeholder="Email" 
            value={formik.values.email} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200  ml-10"
          /><br />
          {formik.touched.email && formik.errors.email && 
            <div className='text-red-500 text-sm text-center'>{formik.errors.email}</div>
          }
          <br />
          <input 
            name="mobile_number" 
            placeholder="Mobile Number" 
            value={formik.values.mobile_number} 
            onChange={formik.handleChange} 
            onBlur={formik.handleBlur} 
            className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200  ml-10"
          /><br />
          {formik.touched.mobile_number && formik.errors.mobile_number && <
            div className='text-red-500 text-sm text-center'>{formik.errors.mobile_number}</div>
          }
          <br />
          <input 
          name="address" 
          placeholder="Address" 
          value={formik.values.address} 
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
          className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200  ml-10"
          /><br />
          {formik.touched.address && formik.errors.address && 
            <div className='text-red-500 text-sm text-center ' >{formik.errors.address}</div>
          }
        <br />
        </>
      )}

        {role === 'user' && (
          
        <>
        {role === 'user' && (
        <div className="mb-4">

    <select
      name="membership_type"
      value={formik.values.membership_type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="border border-gray-300 rounded px-3 py-2 w- text-gray-600 w-75 ml-9" 
    >
      <option value="">Select membership</option>
      <option value="student">Student</option>
      <option value="adult">Adult</option>
      <option value="senior">Senior</option>
    </select>
    
    {formik.touched.membership_type && formik.errors.membership_type && (
      <div className="text-red-500 text-sm mt-1 text-center">{formik.errors.membership_type}</div>
    )}
    </div>
    )}
    </>
    )}

      <button type="submit" className='text-white bg-blue-500 p-1 w-[150px] ml-[120px] rounded ' >Register</button>
      </form>
        </div>
    )




};

export default RegisterForm;