// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom';
//
// const ProductDetailPage = () => {
//     const { product_id } = useParams();
//     const [productDetails, setProductDetails] = useState(null);
//
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             const product_id = '6583b6c6f863823fd843cd5f';
//             try {
//                 const response = await fetch(`http://ec2-3-136-159-88.us-east-2.compute.amazonaws.com:5000/items/${product_id}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log(data)
//                     setProductDetails(data);
//                 } else {
//                     console.error(`Failed to fetch product details. Status: ${response.status}`);
//                 }
//             } catch (error) {
//                 console.error("Error fetching product details:", error.message);
//             }
//         };
//
//         // Fetch product details only if product_id is available
//         if (product_id) {
//             fetchProductDetails();
//         }
//     }, [product_id]); // Trigger the effect whenever product_id changes
//
//     return (
//         <div>
//             <h1>Product Detail Page</h1>
//             {productDetails ? (
//                 <div>
//                     <p>Product ID: {productDetails._id}</p>
//                     {productDetails.imageData && (
//                         <img
//                             src={`data:image/png;base64,${productDetails.imageData}`}
//                             alt={productDetails.name} style={{ maxWidth: "100%" }}
//                             className="product-img"
//                         />
//                     )}
//                     <p>Title: {productDetails.title}</p>
//                     <p>Price: {productDetails.price}</p>
//                     <p>Seller ID: {productDetails.user_id}</p>
//                     <p>Description: {productDetails.description}</p>
//
//                     {/* Include other product details as needed */}
//                 </div>
//             ) : (
//                 <p>Loading product details...</p>
//             )}
//         </div>
//     );
// };
//
// export default ProductDetailPage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://ec2-34-229-89-39.compute-1.amazonaws.com:5001/item/${id}/details/async`);
        if (response.ok) {
          const data = await response.json();
          setDetails(data);
        } else {
          console.error('Failed to fetch details');
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      {details && (
        <>
          {/* Product Section */}
          <Card>
            // <Card.Img variant="top" src={details.item?.image} alt={details.item?.title} />
            <Card.Body>
              <Card.Title>{details.item?.title}</Card.Title>
              <Card.Text>{details.item?.description}</Card.Text>
              <Card.Text>Price: ${details.item?.price}</Card.Text>
            </Card.Body>
          </Card>

          {/* Owner Section */}
          <h2>Owner Information</h2>
          <ListGroup>
            <ListGroup.Item>Name: {details.item_user?.full_name}</ListGroup.Item>
            <ListGroup.Item>Email: {details.item_user?.email}</ListGroup.Item>
            <ListGroup.Item>Address: {details.item_user?.address}</ListGroup.Item>
            {/* Add more owner details if needed */}
          </ListGroup>

          {/* Comments Section */}
          <h2>Comments</h2>
          {details.review.map((review, index) => (
            <Card key={index}>
              <Card.Header>Review by: {review.review_user?.full_name}</Card.Header>
              <Card.Body>
                <Card.Text>{review.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
