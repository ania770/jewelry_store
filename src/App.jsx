import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"

import { Routes, Route, Link } from "react-router-dom"
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from "./context/CartProvider/CartProvider";
import Home from "./Pages/Home/Home"
import './styles/main.scss'

export default function App() {

  return (
    <div className="wrapper">

      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>

    </div>
  )
}