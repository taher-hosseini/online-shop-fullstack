// src/components/PrivateComponent.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateComponent = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateComponent;
