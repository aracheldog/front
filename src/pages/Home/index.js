import React from "react";
import NewProducts from "../../components/NewProducts";
import Banner from "../../components/Banner";

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <Banner></Banner>
            <NewProducts></NewProducts>
        </div>
    );
};

export default HomePage;
