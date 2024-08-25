import React from 'react';
import { Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';


export default function PrivateRoute({ isAllowed, children }) {
    if (!isAllowed) {
        return <Navigate to='/' replace />
    }
    return children ? children : <Outlet />;
}
