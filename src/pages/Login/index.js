import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import nav from "../../components/Nav";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

import {useAuth} from "../../components/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();

    // State to manage user input
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State to manage login status
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // State to store user information
    const [userInfo, setUserInfo] = useState(null);





    // Function to handle login
    const handleLogin = async () => {
        try {
            // Simulate a login request (replace with actual API call)
            const response = await fetch("https://user-microservice-402518.ue.r.appspot.com/users/sign_in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                // Store token in sessionStorage
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

                // Store user information in state
                setUserInfo(data.user);

                // Set the login status to true
                setIsLoggedIn(true);
                login(data.user_info);
                navigate("/");

                alert("Login successful!"); // You can replace this with actual handling

            } else {
                // Handle login failure (e.g., show an error message)
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            // Handle other errors (e.g., network issues)
        }
    };





    return (
        <div>
            {isLoggedIn ? (
                <h1>Welcome! You are logged in.</h1>
            ) : (
                <div>
                    <h1>This is the LoginPage!</h1>
                    <label>
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <button onClick={handleLogin}>Login</button>
                    <Link to="https://user-microservice-402518.ue.r.appspot.com/users/google/login/">Sign Up with Google</Link>

                </div>
            )}
        </div>
    );
};

export default LoginPage;
