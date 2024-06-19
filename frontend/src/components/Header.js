// src/components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // محاسبه تعداد کل آیتم‌ها در سبد خرید
    return (
        <header className='header'>
            <div className='container header-wrapper'>
                <div className='header-auth-link'>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile"><span className='me-2'>{user.username}</span><FaUser /></Link>
                            <Link to="/cart">
                                <span className='me-2'>
                                    سبد خرید
                                    {cartItemCount > 0 && (
                                        <span className="badge bg-secondary ms-1">{cartItemCount}</span>
                                    )}
                                </span>
                                <FaShoppingCart/>
                            </Link>

                            <button onClick={logout}>خروج</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><span className='me-2'>ورود</span><BiLogIn/></Link>
                            <Link to="/sign-up"><span className='me-2'>ثبت نام</span><LuUserPlus /></Link>
                        </>
                    )}
                </div>
                <div className='header-nav'>
                    <Link to="/">خانه</Link>
                    <Link to="/products">محصولات</Link>
                    <Link to="/about">درباره ما</Link>
                </div>
                <a href="/" className='header-address'>
                    <h1>فروشگاه اینترنتی</h1>
                </a>
            </div>
        </header>
    );
};

export default Header;
