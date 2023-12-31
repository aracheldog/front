import React, {useState} from "react";
import Pagination from "react-bootstrap/Pagination";
import reviewApiService from "../Review/reviewAPI";
import { Form, Button } from "react-bootstrap";

const ReviewPage = ({ reviews, fetchNewReviews,hasNext, productId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [reviewText, setReviewText] = useState("");
    const userId = sessionStorage.getItem('id')
    const [newReviews, setNewReviews] = useState(reviews);


    const [editedReviewId, setEditedReviewId] = useState(null);
    const [editedReviewText, setEditedReviewText] = useState("");

    const handleEditButtonClick = (reviewId, reviewText) => {
        setEditedReviewId(reviewId);
        setEditedReviewText(reviewText);
    };

    const handleCancelEdit = () => {
        setEditedReviewId(null);
        setEditedReviewText("");
    };

    const handleSaveEdit = async () => {
        if (editedReviewId !== null && editedReviewText.trim() !== "") {
            await reviewApiService.editProductReview(editedReviewId, editedReviewText);
            const data = await reviewApiService.fetchProductReviews(productId, currentPage)
            setNewReviews(data.Reviews)
            setEditedReviewId(null);
            setEditedReviewText("");
            alert("Comment Updated Successfully!")
        }

    };


    const handlePreviousClick = async () => {
        if (currentPage > 1) {
            const data = await fetchNewReviews(currentPage - 1, true);
            setNewReviews(data.Reviews)
            setCurrentPage(currentPage - 1);

            setLoading(true);
        }
    };

    const handleNextClick = async () => {
        const data = await fetchNewReviews(currentPage + 1, false);
        // console.log(data)
        setNewReviews(data.Reviews)
        setCurrentPage(currentPage + 1);
    };


    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        // Perform the API call to submit the review to the review microservice
        try {
            const data = await reviewApiService.submitProductReview(productId, reviewText);

            if (data) {
                // Handle success, maybe fetch the updated reviews for the product
                const data = await reviewApiService.fetchProductReviews(productId, currentPage)
                setNewReviews(data.Reviews)
                setReviewText(""); // Clear the review text after submission
                alert("Review submitted successfully")
            }
        } catch (error) {
            console.error("Error submitting review:", error.message);
        }
    };

    const handleDeleteButtonClick = async (reviewId) => {
        // Call the delete API endpoint here
        await reviewApiService.deleteProductReview(reviewId);
        const data = await reviewApiService.fetchProductReviews(productId, currentPage);
        setNewReviews(data.Reviews);
        alert("Comment Deleted Successfully!");
    };



    return (
        <div>
            <h2>Reviews</h2>

            {newReviews && newReviews.length > 0 ? (
                <div>
                    <ul className="list-group">
                        {newReviews.map((review) => (
                            <li key={review._id} className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3">
                                        <p className="font-weight-bold mb-0">User ID: {review.user_id}</p>
                                        <p className="text-muted">{review.date_created}</p>
                                    </div>
                                    <div className="col-md-9">
                                        {editedReviewId === review._id ? (
                                            <Form>
                                                <Form.Control
                                                    as="textarea"
                                                    value={editedReviewText}
                                                    onChange={(e) => setEditedReviewText(e.target.value)}
                                                    required
                                                />
                                                <Button variant="success" onClick={handleSaveEdit}>
                                                    Save
                                                </Button>{" "}
                                                <Button variant="secondary" onClick={handleCancelEdit}>
                                                    Cancel
                                                </Button>
                                            </Form>
                                        ) : (
                                            <div>
                                                <p>{review.description}</p>
                                                {userId === review.user_id && (
                                                    <>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() =>
                                                                handleEditButtonClick(review._id, review.description)
                                                            }
                                                        >
                                                            Edit
                                                        </Button>{" "}
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => handleDeleteButtonClick(review._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Pagination>
                        <Pagination.Prev onClick={handlePreviousClick} disabled={currentPage === 1} />
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Next onClick={handleNextClick} disabled={!hasNext} />
                    </Pagination>
                </div>
            ) : (
                <p>No reviews available.</p>
            )}


            {/*{reviews.length > 0 ? (*/}
            {/*    <div>*/}
            {/*        <ul className="list-group">*/}
            {/*            {reviews.map((review) => (*/}
            {/*                <li key={review._id} className="list-group-item">*/}
            {/*                    <div className="row">*/}
            {/*                        <div className="col-md-3">*/}
            {/*                            <p className="font-weight-bold mb-0">User ID: {review.user_id}</p>*/}
            {/*                            <p className="text-muted">{review.date_created}</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-md-9">*/}
            {/*                            <p>{review.description}</p>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*        <Pagination>*/}
            {/*            <Pagination.Prev onClick={handlePreviousClick} disabled={currentPage === 1} />*/}
            {/*            <Pagination.Item active>{currentPage}</Pagination.Item>*/}
            {/*            <Pagination.Next onClick={handleNextClick} disabled={!hasNext} />*/}
            {/*        </Pagination>*/}
            {/*    </div>*/}
            {/*) : (*/}
            {/*    <p>No reviews available.</p>*/}
            {/*)}*/}

            <h2>Write a Review</h2>
            <Form onSubmit={handleReviewSubmit}>
                <Form.Group controlId="reviewText">
                    <Form.Label>Your Review:</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit Review
                </Button>
            </Form>
        </div>
    );
};

export default ReviewPage;
