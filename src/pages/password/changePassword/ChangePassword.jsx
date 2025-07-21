import React,{ useState } from "react";
import API from "../../../api/axiosInstance";
import InputField from "../../../components/UI/inputs/InputField";
import Button from "../../../components/UI/button/Button"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { Formik,Form } from "formik";
import * as Yup from "yup";

const ChangePassword = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const schema = Yup.object({
    old_password: Yup.string().required("Old password is required"),
    new_password: Yup.string()
      .min(8, "At least 8 characters")
      .required("New password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = async (values, {resetForm }) => {
    try {
      const res = await API.post("change/password/", {
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      });
      if (res.status === 200) {
        Swal.fire("Success","Password changed successfully","success");
        resetForm();
        if (role === "1") {
          navigate("/admin/dashboard");
        } else if (role === "2") {
          navigate("/staff/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to change password");
    } 
  };
  
  return (
    <div className="max-w-md h-84 mx-auto px-5 py-5 space-y-10  border border-gray-300 rounded shadow-md mt-20 ml-65">
      <h2 className=" text-center text-cyan-800 text-2xl font-bold">Change Password</h2>
      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form >
            <div className="mb-5 ml-5">
              <InputField
                placeholder="Old password"
                name="old_password"
                type="password"
                value={values.old_password}
                onChange={handleChange}
                error={touched.old_password && errors.old_password}
              />
            </div>

            <div className="mb-5 ml-5">
              <InputField
                placeholder="New password"
                name="new_password"
                type="password"
                value={values.new_password}
                onChange={handleChange}
                error={touched.new_password && errors.new_password}
              />
            </div>

            <div className="mb-5 ml-5">
              <InputField
                placeholder="Confirm password"
                name="confirm_password"
                type="password"
                value={values.confirm_password}
                onChange={handleChange}
                error={touched.confirm_password && errors.confirm_password}
              />
            </div>

            <Button type="submit" variant="create" size="sm" className="ml-32 " >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
