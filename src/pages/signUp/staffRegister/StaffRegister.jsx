import React from "react";
import RegisterForm from "../../../components/registerForm/RegisterForm";

const StaffRegister = () =>{
    return(
        <div>
            <RegisterForm submitUrl='staff/register/' role='staff'/>
        </div>
    )
}
export default StaffRegister;
