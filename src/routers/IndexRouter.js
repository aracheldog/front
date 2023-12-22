import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProductPage from "../pages/Product";
import ProfilePage from "../pages/Profile";
import MyProductsPage from "../pages/MyProducts";


const IndexRouter = ()=>{
    return (
        <Router>
            <Routes>
                <Route path= "/" element={<HomePage/>}></Route>
                <Route path= "/login" element={<LoginPage/>}></Route>
                <Route path= "/product" element={<ProductPage/>}></Route>
                <Route path="/product/:product_id" element={<ProductPage/>} />
                <Route path= "/profile" element={<ProfilePage/>}></Route>
                <Route path= "/myProducts" element={<MyProductsPage/>}></Route>
            </Routes>
        </Router>
    )
}
export default IndexRouter;
