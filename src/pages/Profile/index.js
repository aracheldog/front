import React, { useState, useEffect } from "react";

const ProfilePage = () => {
    // State to store user profile data
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Function to fetch user profile data
        const fetchUserProfile = async () => {
            try {
                // Replace the URL with the actual endpoint to fetch user profile
                const response = await fetch("https://user-microservice-402518.ue.r.appspot.com/users/profile/25", {
                    method: "GET",
                    headers: {
                        // Include any necessary headers (e.g., authorization token)
                        // Replace 'YOUR_ACCESS_TOKEN' with an actual token if needed
                        Authorization: `Bearer eyJ0eXAiOiAiSldUIiwgImFsZyI6ICJSUzI1NiIsICJraWQiOiAiNjlkMmY3NzBkYzUwMTY5YTRhMzcwMGFkMjQ5OWY1MDYwYmRjZDZjOSJ9.eyJpYXQiOiAxNzAzMjE2NTcxLCAiZXhwIjogMTcwMzIyMDE3MSwgImlzcyI6ICJqd3QtMTgyQHVzZXItbWljcm9zZXJ2aWNlLTQwMjUxOC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsICJhdWQiOiAiaHR0cHM6Ly90aHJpZnR1c3RvcmUtYXBpLTJ1YnZkazE1N2VjdmguYXBpZ2F0ZXdheS51c2VyLW1pY3Jvc2VydmljZS00MDI1MTguY2xvdWQuZ29vZyIsICJzdWIiOiAiand0LTE4MkB1c2VyLW1pY3Jvc2VydmljZS00MDI1MTguaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCAiZW1haWwiOiAiY3JlYXRldXNlcl9UZXN0QGNvbHVtYmlhLmVkdSIsICJpZCI6IDI1LCAiZnVsbF9uYW1lIjogIm5ldyBuYW1lIiwgImNyZWF0ZWRfYXQiOiAiMjAyMy0xMS0yNlQxNzoxOToyNC43OTkxMTlaIiwgInVwZGF0ZWRfYXQiOiAiMjAyMy0xMi0yMlQwMjozNTowOC4zNTA2MzFaIiwgImFkZHJlc3MiOiAiNTM1IFcgMTE2dGggU3QiLCAiemlwX2NvZGUiOiAiMTAwMjciLCAiY2l0eSI6ICJOZXcgWW9yayIsICJzdGF0ZSI6ICJOWSIsICJjb3VudHJ5IjogIiIsICJkZXNjcmlwdGlvbiI6ICIiLCAiYWNjZXNzX3Rva2VuIjogbnVsbCwgImxvZ2luX3R5cGUiOiAiUGFzc3dvcmQifQ.rnfKNBRC5KHE7uGgQrDcG_VzLK_CPKORrCXiePUuOy_IqMc-4kbhajoD4v4P420N5ObR0EBnYgvuZ8Vcrq5b8Jdb1z3-C66om6QfFNx815BIREMh6NHOHLVyphWisiYLF77ifxJ5WPmwAeh3XpUeefsDkrRXrNPfQQDfT_SX_L24A-15W9M7gpPpMwEMUvX5r1W4_Zy7o1YNbnEMmyO0QIzCYgZVQzHPnEGWo4dQH40MgxQ1om_pPMrnya9D7vGXuCxceovwl0SkGMsayuUPwGy1v0PPkkTzztvNs7mtg3FWxocMDLyvYCCfyPzMDajL8QtNOA2UsuBZ1t42RZdM4Q`,
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

