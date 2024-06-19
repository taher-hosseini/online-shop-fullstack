// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPageMoreInfo from './pages/ProductPageMoreInfo';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Sidebar from "./components/Sidebar";
import './App.css'
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import PrivateComponent from './components/PrivateComponent';
import { ProductProvider } from './contexts/ProductContext';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import CartProvider from './contexts/CartContext';

const App = () => {
    const location = useLocation();
    const showSidebar = location.pathname === '/products';

    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <Header />
                    <div className="container main-content">
                        <div className="row">
                            {showSidebar && (
                                <div className="col-12 col-lg-2">
                                    <Sidebar />
                                </div>
                            )}
                            <div className={showSidebar ? 'col-12 col-lg-10 content' : 'col-12 col-lg-12 content'}>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/products" element={<ProductList />} />
                                    <Route path="/product/:id" element={<ProductPageMoreInfo />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
                                    <Route path="/sign-up" element={isLoggedIn ? <Navigate to="/" /> : <SignUpPage />} />
                                    <Route path="/profile" element={<PrivateComponent><ProfilePage /></PrivateComponent>} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                    <div className="container footer-content">
                        <Footer />
                    </div>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    );
};

export default App;
