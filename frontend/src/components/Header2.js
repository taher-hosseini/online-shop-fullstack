import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { BiLogIn } from "react-icons/bi";
import { LuUserPlus } from "react-icons/lu";
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = () => {
    const { isLoggedIn, logout, user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        // <header className='header'>
            /*<div className='container header-wrapper'>*/
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary header">
            <Container>
                {/*<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse  id="responsive-navbar-nav">
                    <Nav className="">
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile"><span className='me-2'>{user?.username}</span><FaUser /></Link>
                                <Link to="/cart">
                                <span className='me-2'>
                                    سبد خرید
                                    {cartItemCount > 0 && (
                                        <span className="badge bg-secondary ms-1">{cartItemCount}</span>
                                    )}
                                </span>
                                    <FaShoppingCart />
                                </Link>

                                <button onClick={handleLogout}>خروج</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><span className='me-2'>ورود</span><BiLogIn /></Link>
                                <Link to="/sign-up"><span className='me-2'>ثبت نام</span><LuUserPlus /></Link>
                            </>
                        )}
                    </Nav>
                    <Nav className=' mx-auto'>
                        <Link to="/">خانه</Link>
                        <Link to="/products">محصولات</Link>
                        <Link to="/about">درباره ما</Link>
                    </Nav>
                    <Nav>
                        <a href="/" className='header-address'>
                            <h1>فروشگاه اینترنتی</h1>
                        </a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        /*</div>*/
        // </header>
    );
};

export default Header;
