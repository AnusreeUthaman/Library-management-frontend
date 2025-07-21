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

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); 

  const handleResend =()=>{
    navigate("/forgot/password")
  }
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(4, "OTP must be 4 digits") 
      .matches(/^[0-9]+$/, "OTP must be numbers only")
      .required("OTP is required"),
  });

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await API.post(`verify/otp/${userId}/`, values);
        console.log("userId:", userId);
        console.log("Submitted OTP values:", values);

        if (res.status === 200) {
          Swal.fire("OTP Verified");
          navigate(`/reset/password/${userId}`);
        }
      } catch (error) {
        console.error("Failed to verify OTP:", error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.error || "Failed to verify");
        } else {
          toast.error("Something went wrong");
        }
      }
    },
  });

  return (
    <div>
      <div className="max-w-sm mx-auto space-y-5 border p-4 h-42 border-gray-300 rounded mt-10">
        <form onSubmit={formik.handleSubmit} className="mt-7">
          <InputField
            placeholder="Enter the OTP"
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && formik.errors.otp}
          />
          <div>
          <button onClick={handleResend} type="submit" className="text-blue-600 text-center text-sm ml-35 underline ">
            Resend Otp
          </button>
          </div>
          <Button
            type="submit"
            size="sm"
            variant="create"
            className="ml-35 mt-2"
          >
            Verify
          </Button>

        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;