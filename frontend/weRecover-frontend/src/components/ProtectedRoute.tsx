import React, { FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if JWT is present in local storage

    return (
        <Routes>
            <Route path="*" element={isAuthenticated ? <Component /> : <Navigate to="/login" />} />
        </Routes>
    );
};

export default ProtectedRoute;
