import React from "react";
import NewProducts from "../../components/NewProducts";
import Banner from "../../components/Banner";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const MyProducts = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        // Fetch products when the component mounts
        fetchProducts();
    }, []); // Remove [products] from the dependency array

    const fetchProducts = async () => {
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const token = sessionStorage.getItem("token");
            const apiBaseUrl = process.env.REACT_APP_ITEMURL;
            //const myItemUrl = `${apiBaseUrl}/myItem`;
            const myItemUrl = `http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/myItem`;
            const response = await fetch(myItemUrl, {
                method: "GET",
                headers: {
                    // Include any necessary headers (e.g., authorization token)
                    // Replace 'YOUR_ACCESS_TOKEN' with an actual token if needed
                    Authorization: `Bearer ` + token,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            console.log(data.items)
            setProducts(data.items);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    return (
        <div>
            <h1>My Products</h1>
            
        </div>
    );
};

export default MyProducts;