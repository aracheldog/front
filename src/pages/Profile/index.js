import React, { useState, useEffect } from "react";

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
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;

