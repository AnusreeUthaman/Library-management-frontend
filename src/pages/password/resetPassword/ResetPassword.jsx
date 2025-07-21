import React,{useState} from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate,useParams } from 'react-router-dom';
import InputField from "../../../components/UI/inputs/InputField";
import Button from "../../../components/UI/button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPassword =() =>{

    const {userId} =useParams();
    const navigate = useNavigate();

    const ValidationSchema = Yup.object({
        new_password:Yup.string()
            .min(8,"Password must be at least 8 characters ")
            .required('New password is required'),
        confirm_password:Yup.string()
            .oneOf([Yup.ref("new_password")],"password must match")
            .required("confirm password is required")

    });
    const formik = useFormik({
        initialValues:{
            new_password:"",
            confirm_password:""
        },
        ValidationSchema,
        onSubmit:async (values)=>{
            try{
                const res =await API.post(`reset/password/${userId}/`,values);
                if (res.status === 200){
                    Swal.fire('password reset successfully');
                    navigate("/")
                }
            }catch(error){
                console.error(error)
                if(error.response && error.response.data){
                    toast.error(error.response.data.error)
                }else{
                    toast.error("something went wrong")
                }
            }
        }
    });
    return(
        <>
        <div className="max-w-sm mx-auto space-y-5 border p-5 h-58 border-gray-300 rounded mt-10">
            <form onSubmit={formik.handleSubmit} className="mt-9 space-y-4">
                <InputField
                 placeholder="Enter New Password"
                 name="new_password"
                 type="password"
                 value={formik.values.new_password}
                 onChange={formik.handleChange}
                 onBlur ={formik.handleBlur}
                 error={formik.touched.new_password && formik.errors.new_password}
                />
                <InputField 
                 placeholder="Confirm New Password"
                 name="confirm_password"
                 type="password"
                 value={formik.values.confirm_password}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 error={formik.touched.confirm_password && formik.errors.confirm_password}
                />

                <Button type="submit" variant="create" size="sm" className='ml-25 mt-5'>
                    Reset Password
                </Button>
            </form>
        </div>
        </>
    )

}
export default ResetPassword;