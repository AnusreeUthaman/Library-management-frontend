import React from "react";
import RegisterForm from "../../../components/registerForm/RegisterForm";

const UserRegister =() =>{
    return(
        <>
            <RegisterForm submitUrl='user/register/' role='user' />
        </>
    )
}

export default UserRegister;