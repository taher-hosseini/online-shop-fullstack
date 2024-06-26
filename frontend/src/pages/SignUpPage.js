// src/pages/SignUpPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('http://localhost:5000/register', {
            const response = await axios.post('https://online-shop-fullstack-server.vercel.app/register', {
                firstName,
                lastName,
                email,
                password
            });
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>ثبت نام کاربر جدید</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="FirstName">نام</label>
                    <input
                        type="text"
                        id="FirstName"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="LastName">نام خانوادگی</label>
                    <input
                        type="text"
                        id="LastName"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">ایمیل</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">رمز عبور</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">ثبت نام</button>
            </form>
        </div>
    );
};

export default SignUpPage;
