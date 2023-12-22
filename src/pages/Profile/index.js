import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {useAuth} from "../../components/AuthContext";
import Modal from "react-bootstrap/Modal";
import {findAllByRole} from "@testing-library/react";

const ProfilePage = () => {
    // State to store user profile data
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Function to fetch user profile data
        const fetchUserProfile = async () => {
            try {

                const token = sessionStorage.getItem("token");
                const id = sessionStorage.getItem("id");
                const profileUrl = `https://user-microservice-402518.ue.r.appspot.com/users/profile/${id}`;
                // Replace the URL with the actual endpoint to fetch user profile
                const response = await fetch(profileUrl, {
                    method: "GET",
                    headers: {
                        // Include any necessary headers (e.g., authorization token)
                        // Replace 'YOUR_ACCESS_TOKEN' with an actual token if needed

                        Authorization: `Bearer ` + token,
                    },
                });

                if (response.ok) {
                    // Parse the JSON response
                    const userData = await response.json();
                    console.log(userData)
                    // Set user profile data in state
                    setUserProfile(userData);
                } else {
                    // Handle errors (e.g., show an error message)
                    console.error("Error fetching user profile:", response.statusText);
                }
            } catch (error) {
                // Handle other errors (e.g., network issues)
                console.error("Error fetching user profile:", error.message);
            }
        };

        // Call the fetchUserProfile function
        fetchUserProfile();
    }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

    const { logout, userName } = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleShowDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const navigate = useNavigate();
    const handleDeleteAccount = async () => {
        try {
            // Perform the delete request to delete the user account
            // Include the bearer token from the session in the request headers
            const response = await fetch('https://user-microservice-402518.ue.r.appspot.com/users/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                alert('User deleted successfully!')

                // Perform any additional actions after successful deletion, such as logging out
                logout();
                navigate("/");
            } else {
                alert(`Failed to delete user. Status: ${response.status}`);
            }
        } catch (error) {
            alert('Error deleting user:', error.message);
        } finally {
            setShowDeleteModal(false);
        }
    };


    return (
        <div>
            {userProfile ? (
                <div>
                    <h1>User Profile</h1>
                    <p>ID: {userProfile.id}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>Full Name: {userProfile.full_name}</p>
                    <p>Address: {userProfile.address}</p>
                    <p>City: {userProfile.city}</p>
                    <p>State: {userProfile.state}</p>
                    <p>Zipcode: {userProfile.zip_code}</p>
                    <p>Description: {userProfile.description}</p>
                    {/* Add other profile fields as needed */}
                    <Link to="/edit_profile">
                        <Button variant="primary">Edit Profile</Button>
                    </Link>
                    <Button variant="danger" onClick={handleShowDeleteModal}>
                        Delete Account
                    </Button>
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to delete your account?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDeleteModal}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDeleteAccount}>
                                Delete Account
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;

