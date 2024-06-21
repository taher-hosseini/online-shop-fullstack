import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token); // ذخیره توکن در لوکال استوریج
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // حذف توکن از لوکال استوریج
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
