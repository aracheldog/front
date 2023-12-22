import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ReviewPage from "../Review";
import reviewApiService from "../Review/reviewAPI";

const ProductDetailPage = () => {
    const { product_id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [hasNext, setHasNext] = useState(false);

    const product_service_base_url = 'http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000'


    useEffect(() => {
        const fetchProductDetails = async () => {

            try {
                const response = await fetch(`${product_service_base_url}/items/${product_id}`);
                if (response.ok) {
                    const data = await response.json();

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


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await reviewApiService.fetchProductReviews(product_id, 1);
                if (data) {
                    console.log(data)
                    setReviews(data);
                }
                const data2 = await reviewApiService.fetchProductReviews(product_id, 2);
                if (data2.Reviews.length>0) {
                    setHasNext(true)
                }
            } finally {
            }
        };
        // Fetch reviews when the component mounts or when product_id changes
        fetchReviews();
    }, [product_id]);

    const fetchReviews = async (pageNumber) => {
        try {
            console.log(pageNumber)
            const data = await reviewApiService.fetchProductReviews(product_id, pageNumber);
            if (data) {
                setReviews(data);
            }
            const data2 = await reviewApiService.fetchProductReviews(product_id, pageNumber+1);
            if (data2.Reviews.length>0) {
                setHasNext(true)
            }
            else{
                setHasNext(false)
            }
        } catch (error) {
            console.error("Error fetching reviews:", error.message);
        }
    };

    return (
        <div>
            <h1>Product Detail Page</h1>
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


                    <ReviewPage reviews={reviews.Reviews} fetchNewReviews={fetchReviews} hasNext={hasNext} productId = {productDetails._id} />

                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
};

export default ProductDetailPage;