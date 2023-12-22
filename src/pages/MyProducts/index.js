import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    // Define form fields here
    title: "",
    description: "",
    price: "",
  });

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
            setProducts(data.items);
            console.log(token)
            console.log(data.items)
            console.log(products);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
          title: "",
          description: "",
          price: "",
        });
      };
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleCreateItem = async () => {
        try {
          // Ensure that required fields are not empty before creating the item
          if (!formData.title || !formData.description || !formData.price) {
            // Handle validation error, show a message, or prevent the submission
            console.error('Please fill in all required fields');
            return;
          }
      
          // Construct the request body
          const requestBody = {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            // Add other fields as needed
          };
      
          // Fetch the API endpoint for creating a new item
          const token = sessionStorage.getItem("token");
          const apiBaseUrl = process.env.REACT_APP_ITEMURL;
          //const createItemUrl = `${apiBaseUrl}/items`;
          const createItemUrl = `http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items`;
      
          const response = await fetch(createItemUrl, {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            // Handle error, show a message, or log the error
            console.error('Failed to create item:', response.statusText);
            return;
          }
      
          // Reset the form data and close the modal after successfully creating the item
          setFormData({
            title: "",
            description: "",
            price: "",
          });
      
          handleCloseModal();
          // Optionally, you can fetch and update the list of items to reflect the newly created item
          // fetchProducts();
        } catch (error) {
          console.error('Error creating item:', error.message);
        }
      };
    
      return (
        <div>
          <h1>My Products</h1>
          <Button variant="primary" onClick={handleShowModal}>
            Add New Item
          </Button>
    
          {/* List of Products */}
          <ListGroup>
            {products.map((product) => (
              <Card key={product._id}>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
                {/* Add Update and Delete buttons */}
                <Card.Footer>
                  <Button variant="info">Update</Button>{" "}
                  <Button variant="danger">Delete</Button>
                </Card.Footer>
              </Card>
            ))}
          </ListGroup>
    
          {/* Create Item Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Include form fields for title, description, and price */}
                <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    />
                </Form.Group>
    
                <Button variant="primary" onClick={handleCreateItem}>
                  Create Item
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      );
    };
    
    export default MyProducts;