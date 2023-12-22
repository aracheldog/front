import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const login = (user) => {
        setIsLoggedIn(true);
        setUserName(user.full_name); // Assuming you have the user's full name in the response
    };

    const update = (userName) =>{
        setUserName(userName);
    }

    const logout = () => {

        // Clear user-related data from sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('user_name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('user');


        setIsLoggedIn(false);
        setUserName('');
        console.log(isLoggedIn, userName)

    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, login, logout, update }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
