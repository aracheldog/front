import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";

const ProductListPage = () => {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await fetch(`http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items/${currentPage}`);

                if (response.ok) {
                    const data = await response.json();
                    setProductList(data.items);
                } else {
                    console.error(`Failed to fetch product list. Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching product list:", error.message);
            } finally {
                setLoading(false);
            }
        };

        // Fetch product list when the component mounts
        fetchProductList();
    }, [currentPage]); // Trigger the effect only once when the component mounts

    const handlePreviousClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setLoading(true);
        }
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
        setLoading(true);
    };

    const totalPages = 2;

    return (
        <div>
            <h1>Product List</h1>
            {loading ? (
                <p>Loading product list...</p>
            ) : (
                <div className="row">
                    {productList.map(product => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <Card>
                                {product.imageData && (
                                    <Card.Img
                                        variant="top"
                                        src={`data:image/png;base64,${product.imageData}`}
                                        alt={product.description}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    {/* Include other product details as needed */}
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                                    <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                                    <ListGroup.Item>Seller ID: {product.user_id}</ListGroup.Item>
                                    {/* Include other product details as needed */}
                                </ListGroup>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev onClick={handlePreviousClick} disabled={currentPage === 1} />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={handleNextClick} disabled={currentPage == totalPages} />
                </Pagination>
            </div>
        </div>
    );
};

export default ProductListPage;
