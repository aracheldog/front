import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
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
        zipcode: sessionStorage.getItem("zip_code") || "",
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
                zip_code: updatedProfile.zipcode,
                description: updatedProfile.description,
            };

            const userId = sessionStorage.getItem("id")
            const response = await fetch(`https://user-microservice-402518.ue.r.appspot.com/users/profile/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify(updatedUserData),
            });

            if (response.ok) {
                console.log("Profile updated successfully!");
                sessionStorage.setItem("user_name", updatedProfile.name);
                sessionStorage.setItem("address", updatedProfile.address);
                sessionStorage.setItem("state", updatedProfile.state);
                sessionStorage.setItem("city", updatedProfile.city);
                sessionStorage.setItem("zip_code", updatedProfile.zipcode);
                sessionStorage.setItem("description", updatedProfile.description);
                update(updatedProfile.name)
                navigate("/profile");
                // You may choose to redirect the user or show a success message
            } else {
                console.error(`Failed to update profile. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            <Form>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="text" name="email" value={updatedProfile.email} readOnly />
                </Form.Group>

                <Form.Group controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" name="name" value={updatedProfile.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formAddress">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type="text" name="address" value={updatedProfile.address} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formState">
                    <Form.Label>State:</Form.Label>
                    <Form.Control type="text" name="state" value={updatedProfile.state} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formCity">
                    <Form.Label>City:</Form.Label>
                    <Form.Control type="text" name="city" value={updatedProfile.city} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formZipCode">
                    <Form.Label>Zip Code:</Form.Label>
                    <Form.Control type="text" name="zip_code" value={updatedProfile.zipcode} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" name="description" value={updatedProfile.description} onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default EditProfilePage;
