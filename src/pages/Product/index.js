import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { product_id } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const product_id = '6583b6c6f863823fd843cd5f';
            try {
                const response = await fetch(`http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items/${product_id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setProductDetails(data);
                } else {
                    console.error(`Failed to fetch product details. Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching product details:", error.message);
            }
        };

        // Fetch product details only if product_id is available
        if (product_id) {
            fetchProductDetails();
        }
    }, [product_id]); // Trigger the effect whenever product_id changes

    return (
        <div>
            <h1>Product Page</h1>
            {productDetails ? (
                <div>
                    <p>Product ID: {productDetails._id}</p>
                    {productDetails.imageData && (
                        <img
                            src={`data:image/png;base64,${productDetails.imageData}`}
                            alt={productDetails.name} style={{ maxWidth: "100%" }}
                            className="product-img"
                        />
                    )}
                    <p>Title: {productDetails.title}</p>
                    <p>Price: {productDetails.price}</p>
                    <p>Seller ID: {productDetails.user_id}</p>
                    <p>Description: {productDetails.description}</p>

                    {/* Include other product details as needed */}
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductPage;
