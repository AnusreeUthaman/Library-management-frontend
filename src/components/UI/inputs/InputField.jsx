import React from "react";

const InputField = ({label,name,value,onChange,placeholder,type="text",error}) =>{

    return(
        <>
        <div className="mb-2">
            <label htmlFor={name} className="block text-gray-700 mb-1">
                {label}
            </label>
            <input 
             type={type}
             name={name}
             value={value}
             onChange={onChange}
             placeholder={placeholder}
             className="w-75 border border-gray-300 rounded-lg shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition duration-200 mr-[30px] ml-7 "
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        </>
    )
}
export default InputField; 