import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../zustand/useStore.js';

const ProtectedRoute = () => {
    const { user, loading } = useStore();

    if (loading) return <p>Loading...</p>;

    return user ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoute;
