import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../components/AuthContext";

const EditProfilePage = () => {
    const { update } = useAuth();
    const navigate = useNavigate();
    const [updatedProfile, setUpdatedProfile] = useState({
        // Initialize with the existing profile data from sessionStorage or default values
        email: sessionStorage.getItem("email") || "",
        name: sessionStorage.getItem("user_name") || "",
        address: sessionStorage.getItem("address") || "",
        state: sessionStorage.getItem("state") || "",
        city: sessionStorage.getItem("city") || "",
        zip_code: sessionStorage.getItem("zip_code") || "",
        description: sessionStorage.getItem("description") || "",
    });

    useEffect(() => {
        // No need to fetch user profile data when using sessionStorage
    }, []);

    const handleInputChange = (e) => {
        // Update the updatedProfile state based on user input
        setUpdatedProfile({
            ...updatedProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveChanges = async () => {
        try {
            // Update the user information in sessionStorage
            // Note: Do not update email since it's not updatable


            const updatedUserData = {
                full_name: updatedProfile.name,
                address: updatedProfile.address,
                state: updatedProfile.state,
                city: updatedProfile.city,
                zip_code: updatedProfile.zip_code,
                description: updatedProfile.description,
            };

            const formData = new FormData();

            formData.append("full_name", updatedProfile.name);
            formData.append("address", updatedProfile.address);
            formData.append("state", updatedProfile.state);
            formData.append("city", updatedProfile.city);
            formData.append("zip_code", updatedProfile.zip_code);
            formData.append("description", updatedProfile.description);

            const userId = sessionStorage.getItem("id")

            const response = await fetch(`https://user-microservice-402518.ue.r.appspot.com/users/profile/${userId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`, // Add your authorization header
                },
                body: formData,
            });


            if (response.ok) {
                console.log("Profile updated successfully!");
                sessionStorage.setItem("user_name", updatedProfile.name);
                sessionStorage.setItem("address", updatedProfile.address);
                sessionStorage.setItem("state", updatedProfile.state);
                sessionStorage.setItem("city", updatedProfile.city);
                sessionStorage.setItem("zip_code", updatedProfile.zip_code);
                sessionStorage.setItem("description", updatedProfile.description);

                update(updatedProfile.name)
                alert("Profile Updated Successfully!")
                navigate("/profile");
                // You may choose to redirect the user or show a success message
            } else {
                if (response.status == 400){
                    alert("Input address is not valid! Check it before updating profile!")
                }
                console.error(`Failed to update profile. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email:</label>
                    <input type="text" className="form-control" id="inputEmail" name="email" value={updatedProfile.email} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name:</label>
                    <input type="text" className="form-control" id="inputName" name="name" value={updatedProfile.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address:</label>
                    <input type="text" className="form-control" id="inputAddress" name="address" value={updatedProfile.address} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputState" className="form-label">State:</label>
                    <input type="text" className="form-control" id="inputState" name="state" value={updatedProfile.state} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputCity" className="form-label">City:</label>
                    <input type="text" className="form-control" id="inputCity" name="city" value={updatedProfile.city} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputZipCode" className="form-label">Zip Code:</label>
                    <input type="text" className="form-control" id="inputZipCode" name="zip_code" value={updatedProfile.zip_code} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputDescription" className="form-label">Description:</label>
                    <textarea className="form-control" id="inputDescription" name="description" value={updatedProfile.description} onChange={handleInputChange}></textarea>
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </form>

        </div>
    );
};

export default EditProfilePage;
