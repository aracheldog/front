import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form, Image } from 'react-bootstrap';
import {useAuth} from "../AuthContext";
import {Link} from "react-router-dom";


const Navigation = () => {
    const { isLoggedIn, logout, userName } = useAuth();


    return (
        <div>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Link to="/" className="navbar-brand">ThriftuStore</Link>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/product" className="nav-link">Products</Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <span style={{ marginRight: '10px' }}></span>

                    <div className="ms-2">
                        {(isLoggedIn ) ?  (
                            <>
                                <span className="me-2">Welcome! {userName !== "" ? userName : "Anonymous User"}</span>
                                <Button variant="outline-danger" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ): (
                            < Link to="/login">
                                <Button variant="outline-success">Login</Button>
                            </Link>
                        )}
                    </div>

                    < Link to="/profile">
                        <Image src={require('../../assets/imgs/user.png')} alt="userIcon" />
                    </Link>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;
