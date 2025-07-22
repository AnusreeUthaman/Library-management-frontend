import React from "react";
import InputField from "../UI/inputs/InputField";


const ProfileForm = ({ formData, setFormData, onSubmit, readOnly }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fields = [
    { name: "username", label: "Username" },
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "mobile_number", label: "Mobile Number" },
    { name: "address", label: "Address" },
  ];

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto "
    >
      <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
        {readOnly ? "Your Profile" : "Edit Profile"}
      </h2>

      {fields.map(({ name, label, type = "text" }) => (
        <div className="mb-4" key={name}>
          <InputField
            type={type}
            name={name}
            label={label}
            value={formData[name] || ""}
            onChange={handleChange}
            readOnly={readOnly}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none ${
              readOnly
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-blue-200"
            }`}
          />
          
        </div>
      ))}

    </form>
  );
};

export default ProfileForm;
