import React from "react"
import Header from "./component/Header.js"
import Footer from "./component/Footer.js"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home/index.jsx"
import Contact from "./pages/contact/index.jsx"
import Login from "./pages/auth/Login.jsx"
import Register from "./pages/auth/Register.jsx"
import Reset from "./pages/auth/Reset"
import Cart from "./pages/cart/index.jsx"
import Favories from "./pages/favories/Favories.jsx"
import CheckoutDetails from "./pages/checkout/CheckoutDetails.jsx"
import Checkout from "./pages/checkout/Checkout.jsx"
import Successful from "./pages/checkout/Successful.jsx"
import Admin from "./pages/admin/index.jsx"

import AddProduct from "./pages/admin/AddProducts"

import AllProducts from "./pages/admin/AllProducts.jsx"

import Orders from "./pages/admin/Orders.jsx"
import OrderDetails from "./pages/admin/OrderDetails.jsx"
import OrderHistory from "./pages/admin/OrderHistory.jsx"
import { ToastContainer } from "react-toastify"
import ReviewOrderDetails from "./pages/admin/ReviewOrderDetails.jsx"
import ReviewProduct from "./pages/admin/ReviewProduct.jsx"
import ProductDetails from "./pages/home/product/ProductDetails.jsx"


function App() {


  return (
     <BrowserRouter> 
          <ToastContainer/>
          <div className="w-full h-full">
              <Header/>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/contact" element={<Contact/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/reset-password" element={<Reset/>} />
                  <Route path="/cart" element={<Cart/>} />
                  <Route path="/favories" element={<Favories/>} />
                  <Route path="/checkout-details" element={<CheckoutDetails/>} />
                  {/* <Route path="/checkout" element={<Checkout/>} /> */}
                  <Route path="/checkout-successfull" element={<Successful/>} />

                  <Route path="/admin/home" element={<Admin/>} />
                  
                  <Route path="/admin/all-products" element={<AllProducts/>} />
                 
                  <Route path="/admin/add-products/:id" element={<AddProduct/>} />

                  <Route path="/admin/orders" element={<Orders/>} />
                  <Route path="/admin/orders/order-details" element={<OrderDetails/>} />
                  <Route path="/order-details/:id" element={<ReviewOrderDetails/>} />
                  <Route path="/review-details/:id" element={<ReviewProduct/>} />
                  <Route path="/product-details/:id" element={<ProductDetails/>} />
                  <Route path="/update-status/:id" element={<OrderDetails/>} />
                  <Route path="/order-history" element={
                      <div className="w-full h-full flex items-center justify-center ">
                        <OrderHistory/>
                      </div> } />
              </Routes>  
              <Footer/>        
          </div>
     </BrowserRouter>
  );
}

export default App;
