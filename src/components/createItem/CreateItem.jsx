import { useState } from "react";
import API from "../../api/axiosInstance";
import Swal from "sweetalert2";
import InputField from "../UI/inputs/InputField";
import { useNavigate } from "react-router-dom";

const CreateItemForm = ({title,placeholder,endpoint,redirect}) => {
    const [name,setName] = useState ("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
   
    try{
        await API.post(endpoint,{name});
        Swal.fire(`${title} Successfully`,"","success")
        setName("");
        navigate(redirect ||'/admin/dashboard')
    } catch (error){
        Swal.fire(`${title} creating failed`,"",'error')
    }
 }
    return(
        <form onSubmit={handleSubmit} className="border-1 border-gray-300 shadow-emerald-100 rounded w-max h-45 mt-8 ml-[350px]">
            <p className=" text-blue-500 font-extrabold ml-[130px] mb-6  text-2xl mt-2"> {title}</p>
            <InputField  
             name="name"
             value={name}
             placeholder={placeholder}
             onChange={(e) => setName(e.target.value)}   
                  
            />
            <button type="submit" className="border-gray-200 rounded p-1 bg-blue-400 text-white w-22 ml-[150px] mt-3">
                Save
            </button>

        </form>
    )

}
export default CreateItemForm;