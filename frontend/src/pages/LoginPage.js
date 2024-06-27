// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm();
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            // const response = await axios.post('http://localhost:5000/login', { email, password });
            const response = await axios.post('https://online-shop-fullstack-server.vercel.app/login', data);
            const { _id, token } = response.data;
            localStorage.setItem('token', token);
            login({ _id, email: data.email, token }); // ذخیره _id به همراه ایمیل و توکن
            setMessage('ورود موفقیت آمیز');
            navigate('/'); // هدایت کاربر به صفحه خانه
        } catch (error) {
            setMessage('خطا در ورود');
        }
    };

    const handleGoogleLogin = async (googleData) => {
        try {
            // const response = await axios.post('http://localhost:5000/google-login', {
            const response = await axios.post('https://online-shop-fullstack-server.vercel.app/google-login', {
                token: googleData.credential,
            });
            const { _id, email, token } = response.data;
            localStorage.setItem('token', token);
            console.log(response)
            login({ _id, email, token }); // ذخیره _id به همراه ایمیل و توکن
            setMessage('ورود موفقیت آمیز با گوگل');
            navigate('/'); // هدایت کاربر به صفحه خانه
        } catch (error) {
            setMessage('خطا در ورود با گوگل');
        }
    };

    const emailValue = watch('email');
    const passwordValue = watch('password');

    return (
        <div className="form-container">
            <p className="title">ورود به حساب کاربری</p>
            <form className="form" onSubmit={handleSubmit(handleLogin)}>
                <input
                    type="email"
                    className={`input ${errors.email ? 'is-invalid' : (emailValue ? 'is-valid' : '')}`}
                    {...register('email', {
                        required: 'وارد کردن ایمیل الزامی است',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'فرمت ایمیل نادرست است'
                        },
                        onChange: () => trigger('email')
                    })}
                    placeholder="ایمیل"
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <input
                    type="password"
                    className={`input ${errors.password ? 'is-invalid' : (passwordValue ? 'is-valid' : '')}`}
                    {...register('password', {
                        required: 'وارد کردن رمز عبور الزامی است',
                        onChange: () => trigger('password')
                    })}
                    placeholder="رمز عبور"
                />
                {errors.password && <p className="error-message">{errors.password.message}</p>}

                <p className="page-link">
                    {/*<span className="page-link-label">فراموشی رمز عبور؟</span>*/}
                </p>
                {message && <p className='message'>{message}</p>}
                <button className="form-btn">ورود</button>
            </form>

            <GoogleOAuthProvider clientId="940143946792-6u6fejd3788qki06ql5blvlkncjdg2hd.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => setMessage('خطا در ورود با گوگل')}
                />
            </GoogleOAuthProvider>

            <p className="sign-up-label">
                هنوز اکانت ندارید؟<Link to="/sign-up" className="sign-up-link">ثبت نام</Link>
            </p>
        </div>
    );
};

export default LoginPage;




// // src/pages/LoginPage.js
// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import './LoginPage.css'
// import { AuthContext } from "../contexts/AuthContext";
// import {Link, useNavigate} from 'react-router-dom';
//
// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const { login } = useContext(AuthContext);
//     const navigate = useNavigate();
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//
//         try {
//             // const response = await axios.post('http://localhost:5000/login', { email, password });
//             const response = await axios.post('https://online-shop-fullstack-server.vercel.app/login', { email, password });
//             const { _id, token } = response.data;
//             localStorage.setItem('token', token);
//             login({ _id, email, token }); // ذخیره _id به همراه ایمیل و توکن
//             setMessage('ورود موفقیت آمیز');
//             navigate('/'); // هدایت کاربر به صفحه خانه
//         } catch (error) {
//             setMessage('خطا در ورود');
//         }
//     };
//
//     return (
//         <div className="form-container">
//             <p className="title">ورود به حساب کاربری</p>
//             <form className="form" onSubmit={handleLogin}>
//                 <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="ایمیل"/>
//                 <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="رمز عبور"/>
//                 <p className="page-link">
//                     {/*<span className="page-link-label">فراموشی رمز عبور؟</span>*/}
//                 </p>
//                 {message && <p className='message'>{message}</p>}
//                 <button className="form-btn">ورود</button>
//             </form>
//
//             <p className="sign-up-label">
//                 هنوز اکانت ندارید؟<Link to="/sign-up" className="sign-up-link">ثبت نام</Link>
//             </p>
//         </div>
//     );
// };
//
// export default LoginPage;
