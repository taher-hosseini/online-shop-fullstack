// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './LoginPage.css'
import { AuthContext } from "../contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // const response = await axios.post('http://localhost:5000/login', { email, password });
            const response = await axios.post('https://online-shop-fullstack-server.vercel.app/login', { email, password });
            const { _id, token } = response.data;
            localStorage.setItem('token', token);
            login({ _id, email, token }); // ذخیره _id به همراه ایمیل و توکن
            setMessage('ورود موفقیت آمیز');
            navigate('/'); // هدایت کاربر به صفحه خانه
        } catch (error) {
            setMessage('خطا در ورود');
        }
    };

    return (
        <div className="form-container">
            <p className="title">ورود به حساب کاربری</p>
            <form className="form" onSubmit={handleLogin}>
                <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="ایمیل"/>
                <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="رمز عبور"/>
                <p className="page-link">
                    {/*<span className="page-link-label">فراموشی رمز عبور؟</span>*/}
                </p>
                {message && <p className='message'>{message}</p>}
                <button className="form-btn">ورود</button>
            </form>

            <p className="sign-up-label">
                هنوز اکانت ندارید؟<Link to="/sign-up" className="sign-up-link">ثبت نام</Link>
            </p>
        </div>
    );
};

export default LoginPage;
