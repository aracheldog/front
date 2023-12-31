

const review_service_api_url = "http://ec2-3-95-23-212.compute-1.amazonaws.com:8011";

const reviewApiService = {
    fetchProductReviews: async (productId, page) => {
        try {

            const response = await fetch(`${review_service_api_url}/${productId}/reviews/${page}`);

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data;
            } else {
                console.error(`Failed to fetch product reviews. Status: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching product reviews:", error.message);
            return null;
        }
    },

    submitProductReview: async (productId, reviewText) => {
        try {
            const formData = new FormData();
            formData.append("item_id", productId);
            formData.append("description", reviewText);
            const authToken = sessionStorage.getItem('token')

            const response = await fetch(`${review_service_api_url}/reviews`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Failed to submit review. Status: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error("Error submitting review:", error.message);
            return null;
        }
    },

    editProductReview: async (reviewID, reviewText) => {
        try {
            const formData = new FormData();
            formData.append("description", reviewText);
            const authToken = sessionStorage.getItem('token')

            const response = await fetch(`${review_service_api_url}/reviews/${reviewID}`, {
                method: "PUT",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Failed to edit review. Status: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error("Error editing review:", error.message);
            return null;
        }
    },

    deleteProductReview: async (reviewId) => {
        try {
            const authToken = sessionStorage.getItem('token');

            const response = await fetch(`${review_service_api_url}/reviews/${reviewId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });

            if (response.ok) {
                console.log(`Review with ID ${reviewId} deleted successfully.`);
            } else {
                console.error(`Failed to delete review. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting review:", error.message);
        }
    },


};

export default reviewApiService;
