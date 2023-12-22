import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const MyProducts = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    // Define form fields here
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        // Fetch products when the component mounts
        fetchProducts();
    }, []); // Remove [products] from the dependency array

    const fetchProducts = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const apiBaseUrl = process.env.REACT_APP_ITEMURL;
            //const myItemUrl = `${apiBaseUrl}/myItem`;
            const myItemUrl = `http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/myItem`;
            const response = await fetch(myItemUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ` + token,
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            setProducts(data.items);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const handleShowModal = (productId) => {
        if (productId) {
          // If productId is provided, set the form data for update mode
          const selectedProduct = products.find((product) => product._id === productId);
          setSelectedProductId(productId);
    
          if (selectedProduct) {
            setFormData({
              title: selectedProduct.title || "",
              description: selectedProduct.description || "",
              price: selectedProduct.price || "",
              image: null, // You may want to fetch the existing image URL and display it if needed
            });
          }
          setIsUpdating(true);
        } else {
          // If productId is not provided, reset the form data for create mode
          setFormData({
            title: "",
            description: "",
            price: "",
            image: null,
          });
          setIsUpdating(false);
        }
    
        setShowModal(true);
    };
    
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
          title: "",
          description: "",
          price: "",
          image:null,
        });
        setSelectedProductId(null);
        setIsUpdating(false);
    };
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
      };

      const handleCreateItem = async () => {
        try {
          // Ensure that required fields are not empty before creating the item
          if (!formData.title || !formData.description || !formData.price|| !formData.image) {
            // Handle validation error, show a message, or prevent the submission
            console.error('Please fill in all required fields');
            return;
          }
      
      
          // Fetch the API endpoint for creating a new item
          const token = sessionStorage.getItem("token");
          const apiBaseUrl = process.env.REACT_APP_ITEMURL;
          //const createItemUrl = `${apiBaseUrl}/items`;
          const createItemUrl = `http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items`;
      
          const formDataToSend = new FormData();
          formDataToSend.append('title', formData.title);
          formDataToSend.append('description', formData.description);
          formDataToSend.append('price', formData.price);
          formDataToSend.append('image', formData.image);
          const response = await fetch(createItemUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
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
            image:null,
          });
      
          handleCloseModal();
          // Optionally, you can fetch and update the list of items to reflect the newly created item
          // fetchProducts();
        } catch (error) {
          console.error('Error creating item:', error.message);
        }
      };
    
      const handleUpdateItem = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const apiBaseUrl = process.env.REACT_APP_ITEMURL;
          const updateItemUrl = `http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items/${selectedProductId}`;
    
          const formDataToSend = new FormData();

          if (formData.title !== null) {
          formDataToSend.append('title', formData.title);
          }

          if (formData.description !== null) {
          formDataToSend.append('description', formData.description);
          }

          if (formData.price !== null) {
          formDataToSend.append('price', formData.price);
          }

          if (formData.image !== null) {
          formDataToSend.append('image', formData.image);
          }

    
          const response = await fetch(updateItemUrl, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          });
    
          if (!response.ok) {
            console.error('Failed to update item:', response.statusText);
            return;
          }
    
          setFormData({
            title: "",
            description: "",
            price: "",
            image: null,
          });
    
          handleCloseModal();
          // Optionally, you can fetch and update the list of items to reflect the changes
          // fetchProducts();
        } catch (error) {
          console.error('Error updating item:', error.message);
        }
      };

      const handleDeleteItem = async (productId) => {
        try {
          const token = sessionStorage.getItem("token");
          const apiBaseUrl = process.env.REACT_APP_ITEMURL;
          const deleteItemUrl = `http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items/${productId}`;
    
          const response = await fetch(deleteItemUrl, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.error('Failed to delete item:', response.statusText);
            return;
          }
    
          fetchProducts();
        } catch (error) {
          console.error('Error deleting item:', error.message);
        }
      };

      return (
        <div>
          <h1>My Products</h1>
          <Button variant="primary" onClick={() => handleShowModal(null)}>
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
                  <Button variant="info" onClick={() => handleShowModal(product._id)}>Update</Button>{" "}
                  <Button variant="danger" onClick={() => handleDeleteItem(product._id)}>Delete</Button>
                </Card.Footer>
              </Card>
            ))}
          </ListGroup>
    
          {/* Create or Update Item Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProductId ? "Update Item" : "Create New Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

            {/* Add file input for image */}
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={isUpdating ? handleUpdateItem : handleCreateItem}>
              {isUpdating ? "Update Item" : "Create Item"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MyProducts;