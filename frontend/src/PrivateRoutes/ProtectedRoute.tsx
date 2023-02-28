import React, {useContext} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface childrenProps {
    children: JSX.Element;
}

const ProtectedRoute = ({children, ...rest}:any) =>{
    const authCtx = useAuth();

    return (
        !authCtx.isAuthenticated ? <Navigate to="/login" /> : <Outlet />
    )
}

export default ProtectedRoute;