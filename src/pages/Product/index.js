import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { Link } from 'react-router-dom'; // Make sure to import Link here


const ProductListPage = () => {
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const product_service_base_url = 'http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000'


    useEffect(() => {
        // Fetch total pages when the component mounts
        const fetchTotalPages = async () => {
            try {
                const response = await fetch(`${product_service_base_url}/items/page`);

                if (response.ok) {
                    const data = await response.json();
                    setTotalPages(data.totalPages);
                } else {
                    console.error(`Failed to fetch total pages. Status: ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching total pages:", error.message);
            }
        };

        fetchTotalPages();
    }, []);

    useEffect(() => {
        const fetchProductList = async () => {
            try {

                const response = await fetch(`${product_service_base_url}/items/${currentPage}`);

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

        fetchProductList();
    }, [currentPage]);

    useEffect(() => {
        if (isSearchActive) {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filtered = productList.filter(product =>
                product.title.toLowerCase().includes(lowercasedSearchTerm) ||
                product.description.toLowerCase().includes(lowercasedSearchTerm) ||
                product.price.toString().toLowerCase().includes(lowercasedSearchTerm) ||
                product.user_id.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, productList, isSearchActive]);

    const handleSearch = () => {
        setIsSearchActive(true);
    };

    const handleUndoSearch = () => {
        setSearchTerm('');
        setIsSearchActive(false);
    };

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

    return (
        <div>
            <h1>Product List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
                <Button onClick={handleUndoSearch} variant="secondary">Undo Search</Button>
            </div>
            {loading ? (
                <p>Loading product list...</p>
            ) : (
                <div className="row">

                    {(isSearchActive ? filteredProducts : productList).map(product => (
                      <div key={product._id} className="col-md-4 mb-4">
                      <Link to={`/product/${product._id}`}>
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
                              </Card.Body>
                              <ListGroup className="list-group-flush">
                                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                                  <ListGroup.Item>Price: {product.price}</ListGroup.Item>
                                  <ListGroup.Item>Seller ID: {product.user_id}</ListGroup.Item>
                              </ListGroup>
                          </Card>
                          </Link>
                      </div>

                    ))}
                </div>
            )}
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev onClick={handlePreviousClick} disabled={currentPage === 1} />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={handleNextClick} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </div>
    );
};
export default ProductListPage;
