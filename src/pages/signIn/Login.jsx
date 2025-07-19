import React from 'react';
import API from '../../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login () {
    const navigate = useNavigate();
    const [type, setType] = useState('password');
    
//show/hide 
  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };
    
    const formik = useFormik({
        
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await API.post('login/', values);
                const token = res.data.token;
                const role = res.data.role;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                if (role === 1) {
                    navigate('/admin/dashboard');
                } else if (role === 2) {
                    navigate('/staff/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            } catch (error) {
                alert('Login failed');
            }
        }

    });

    return (
        <div className='border w-[480px] h-[500px] ml-[500px] mx-auto p-4 mt-13 border-gray-300 rounded shadow'>
            
        <form onSubmit={formik.handleSubmit} className="flex flex-col w-[290px] gap-6 mx-auto mt-7 ">
             <p className='text-3xl text-center  text-blue-500 mb-[10px] font-bold'>LOGIN</p>

            <input
                type='text'
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200 "
            />
            {formik.touched.username && formik.errors.username && (
                <div className='text-red-500 text-sm text-center'>{formik.errors.username}</div>
            )}
            <div className="relative">
            <input
                name="password"
                type={type}
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition duration-200 "
            />
            <span className="absolute right-2 top-3 cursor-pointer" onClick={handleToggle} >
            {type === 'password' ? <FaEyeSlash /> : <FaEye />}
            </span>
            </div>
            {formik.touched.password && formik.errors.password && (
                <div className='text-red-500 text-sm text-center'>{formik.errors.password}</div>
            )}

            <button type="submit" className='text-white bg-blue-500 p-1 w-64 ml-5 rounded' >Sign In</button>
            <p className='text-blue-500 text-sm text-center'><Link to='/forgot/Password'>forgot password?</Link></p>
            <p className='text-sm text-center mt-4'>
                Don't have an account? <Link to="/user/register" className='text-blue-600'>Register here</Link>
            </p>
        </form>
        </div>
    );
}

export default Login;