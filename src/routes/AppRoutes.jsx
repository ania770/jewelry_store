import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../Pages/About/About';
import Bag from '../Pages/Bag/Bag';
import Contact from '../Pages/Contact/Contact';
import Error from '../Pages/Error/Error';
import Home from '../Pages/Home/Home';
import MyAccount from '../Pages/MyAccount/MyAccount';
import Privacy from '../Pages/Privacy/Privacy';
import Product from '../Pages/Product/Product';
import Shop from '../Pages/Shop/Shop';
import Shipping from '../Pages/Shipping/Shipping';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/detalis" element={<Detalis />} /> */}
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shipping" element={<Shipping />} />
            {/* Если ни один маршрут не подошел */}
            <Route path="*" element={<Error />} />
        </Routes>
    );
}
