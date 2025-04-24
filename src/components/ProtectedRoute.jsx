import React, { useContext } from "react";  
import { Navigate } from "react-router";
import { AuthContext } from "../context/AppContext";

export default function ProtectedRoute({ children, redirectTo = "/signin" }) {
    const { session, loading } = useContext(AuthContext); 

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!session) {  
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
