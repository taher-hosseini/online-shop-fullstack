import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, matchPath } from 'react-router-dom';
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
    const location = useLocation();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        if (location.pathname === '/') {
            setActive("1");
        } else if (location.pathname.startsWith('/products')) {
            setActive("2");
        } else if (matchPath('/product/:id', location.pathname)) {
            setActive("2");
        } else if (location.pathname === '/about') {
            setActive("3");
        } else {
            setActive("");
        }
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleClick = (event) => {
        setActive(event.target.id);
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
        document.body.classList.toggle('nav-open', !isNavOpen);
    };

    const closeNav = (event) => {
        setIsNavOpen(false);
        document.body.classList.remove('nav-open');
        handleClick(event);
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
                        <Link to="/" onClick={closeNav} className={ `lists ${active === "1" ? "active" : ""}`} id={"1"}>خانه</Link>
                        <Link to="/products" onClick={closeNav} className={ `lists ${active === "2" ? "active" : ""}`} id={"2"}>محصولات</Link>
                        <Link to="/about" onClick={closeNav} className={ `lists ${active === "3" ? "active" : ""}`} id={"3"}>درباره ما</Link>
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
