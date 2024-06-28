import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { BiLogIn } from "react-icons/bi";
import { LuUserPlus } from "react-icons/lu";
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Header = () => {
    const { isLoggedIn, logout, user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
        document.body.classList.toggle('nav-open', !isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
        document.body.classList.remove('nav-open');
    };

    return (
        <>
            <div className={`overlay ${isNavOpen ? 'active' : ''}`} onClick={toggleNav}></div>
            <header className='header'>
                <div className='container header-wrapper'>
                    <div className='header-auth-link'>
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile" onClick={closeNav}><span className='me-2'>{user?.username}</span><FaUser /></Link>
                                <Link to="/cart" onClick={closeNav}>
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
                                <Link to="/login" onClick={closeNav}><span className='me-2'>ورود</span><BiLogIn /></Link>
                                <Link to="/sign-up" onClick={closeNav}><span className='me-2'>ثبت نام</span><LuUserPlus /></Link>
                            </>
                        )}
                    </div>
                    <div className={`nav ${isNavOpen ? 'active' : ''}`}>
                        <Link to="/" onClick={closeNav}>خانه</Link>
                        <Link to="/products" onClick={closeNav}>محصولات</Link>
                        <Link to="/about" onClick={closeNav}>درباره ما</Link>
                    </div>
                    <a href="/" className='header-address'>
                        <h1>فروشگاه اینترنتی</h1>
                    </a>
                    <div className="hamburger" onClick={toggleNav}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
