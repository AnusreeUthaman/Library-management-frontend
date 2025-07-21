import React,{useState} from "react";
import API from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from 'react-router-dom';
import InputField from "../../../components/UI/inputs/InputField";
import Button from "../../../components/UI/button/Button";

const ForgotPassword = () => {
  const [forgotPassword, setForgotPassword] = useState({
    username: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForgotPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("forgot/password/", forgotPassword);
      if (res.status === 200) {
        const userId = res.data.user_id; 
        Swal.fire("OTP sent to your email");
        navigate(`/verify/otp/${userId}`);
      }
    } catch (error) {
      console.error("Failed to send otp", error);
      toast.error(error?.response?.data?.error || "Failed to send OTP");
    }
  };
  
  return (
    <div className=" max-w-sm mx-auto  space-y-5 border  p-4 h-42 border-gray-300 rounded mt-10">
      <form onSubmit={handleSubmit} className="mt-7">
        <InputField
          placeholder="Enter your Username"
          name="username"           
          value={forgotPassword.username}
          onChange={handleChange}
        />
        <Button type="submit" size="sm" variant="create" className='ml-35 mt-5'>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;