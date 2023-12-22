import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignUp = async () => {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            const response = await fetch('https://user-microservice-402518.ue.r.appspot.com/users/sign_up', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Sign-up successful!');
                navigate("/");

            } else {
                alert('Sign-up failed. Please check your information and try again.');
            }
        } catch (error) {
            alert('An error occurred during sign-up. Please try again later.');

        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" onClick={handleSignUp}>
                    Sign Up
                </Button>
            </Form>
            <p>
                Already have an account?{' '}
                <Link to="/login">
                    <strong>Login here</strong>
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
