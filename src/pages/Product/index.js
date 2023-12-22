import React from "react";
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { product_id } = useParams();

    return (
        <div>
            <h1>Product Page</h1>
            {product_id ? (
                <p>Product ID: {product_id}</p>
                // Fetch and display information for the specific product
            ) : (
                <p>Show all products here</p>
                // Fetch and display all products
            )}
        </div>
    );
};

export default ProductPage;
