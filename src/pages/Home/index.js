import React, {useEffect} from "react";
import NewProducts from "../../components/NewProducts";
import Banner from "../../components/Banner";
import {useAuth} from "../../components/AuthContext";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        // Get the URL search parameters
        const urlSearchParams = new URLSearchParams(window.location.search);

        // Get the 'data' parameter from the URL
        const dataParam = urlSearchParams.get('data');

        if (dataParam) {
            // Parse the 'data' parameter (assuming it's a JSON string)
            try {
                const data = JSON.parse(decodeURIComponent(dataParam));
                // Store the data in session storage

                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("id", data.user_info.id);
                sessionStorage.setItem("user_name", data.user_info.full_name);
                sessionStorage.setItem("email", data.user_info.email);
                sessionStorage.setItem("address", data.user_info.address);
                sessionStorage.setItem("city", data.user_info.city);
                sessionStorage.setItem("state", data.user_info.state);
                sessionStorage.setItem("zip_code", data.user_info.zip_code);
                sessionStorage.setItem("description", data.user_info.description);
                sessionStorage.setItem("user", data.user_info)
                // Add other properties as needed...

                // Optional: Redirect to a clean URL without query parameters
                login(data.user_info)
                navigate("/");

                // Do any additional actions with the data if needed
            } catch (error) {
                console.error('Error parsing data parameter:', error);
            }
        }
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <Banner></Banner>
            <NewProducts></NewProducts>
        </div>
    );
};

export default HomePage;
