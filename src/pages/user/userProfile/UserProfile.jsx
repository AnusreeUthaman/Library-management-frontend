import React,{useState,useEffect} from "react";
import API from "../../../api/axiosInstance";
import ProfileForm from "../../../components/profileForm/ProfileForm";
import Button from "../../../components/UI/button/Button";
import Swal from "sweetalert2";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    address: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  


  const fetchUserProfile = async () => {
    try {
      const res = await API.get("user/profile/");
      setFormData(res.data);
    } catch (error) {
      console.error("Error loading profile", error);
      Swal.fire("Error", "Failed to load profile", "error");
    } 
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put("user/profile/", formData);
      Swal.fire("Success", "Profile updated successfully", "success");
      setIsEditMode(false);
    } catch (err) {
      console.error("Update failed", err);
      Swal.fire("Error", "Failed to update profile", "error");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-5 flex flex-col items-center">
      <ProfileForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        readOnly={!isEditMode}
      />

      <div className="mt-4 flex gap-3">
        {isEditMode ? (
          <>
            <Button variant="update" type="submit" onClick={handleSubmit}>
              Save Changes
            </Button>
            <Button variant="cancel" onClick={() => setIsEditMode(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="create" onClick={() => setIsEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;