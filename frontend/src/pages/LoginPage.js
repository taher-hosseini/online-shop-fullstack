import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

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
            localStorage.setItem('token', response.data.token);
            login({ email, token: response.data.token });
            setMessage('Login successful');
            navigate('/'); // هدایت کاربر به صفحه خانه
        } catch (error) {
            setMessage('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
