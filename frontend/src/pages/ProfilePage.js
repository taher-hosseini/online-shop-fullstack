import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const ProfilePage = () => {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        // Fetch user profile from server
        const fetchProfile = async () => {
            try {
                // const response = await axios.get(`http://localhost:5000/users/${user._id}`, {
                const response = await axios.get(`https://online-shop-fullstack-server.vercel.app/users/${user._id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401 && error.response.status === 403) {
                    // اگر توکن منقضی شده باشد
                    console.log('time over')
                    logout();
                } else {
                    console.error("Error fetching profile:", error);
                }

            }
        };

        if (user && user._id) {
            fetchProfile();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title text-center">پروفایل کاربری</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>نام کاربری:</strong> {profile.username}
                                </li>
                                <li className="list-group-item">
                                    <strong>ایمیل:</strong> {profile.email}
                                </li>
                                {/* اطلاعات دیگری که ممکن است در پروفایل نمایش داده شود */}
                            </ul>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={handleLogout}>خروج</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
