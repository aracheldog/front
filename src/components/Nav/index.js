import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, Image} from "react-bootstrap";



const Navigation = () =>{
    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="/">ThriftuStore</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/product">Products</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <span style={{ marginRight: '10px' }}></span>

                    <a href= "/profile">
                        <img
                            src= {require("../../assets/imgs/user.png")} alt="userIcon"
                        />
                    </a>
                </Container>
            </Navbar>
        </div>
    )


}
export default Navigation;
