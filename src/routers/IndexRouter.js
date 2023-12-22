import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProductPage from "../pages/Product";
import ProfilePage from "../pages/Profile";
import MyProductsPage from "../pages/MyProducts";
import ProductDetailPage from "../pages/Product/productDetail";
import EditProfilePage from "../pages/Profile/editProfile";
import Nav from "../components/Nav";
import SignUpPage from "../pages/SignUp";


const IndexRouter = ()=>{

    return (
        <Router>
            <Nav></Nav>
            <Routes>
                <Route path= "/" element={<HomePage/>}></Route>
                <Route path= "/login" element={<LoginPage/>}></Route>
                <Route path= "/signup" element={<SignUpPage/>}></Route>
                <Route path= "/product" element={<ProductPage/>}></Route>
                <Route path="/product/:product_id" element={<ProductDetailPage/>} />
                <Route path= "/profile" element={<ProfilePage/>}></Route>

                <Route path= "/edit_profile" element={<EditProfilePage/>}></Route>
                <Route path= "/myProducts" element={<MyProductsPage/>}></Route>
            </Routes>
        </Router>
    )
}
export default IndexRouter;
