import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "../App";

function NoneAuth({ children, ...rest }) {
    let auth = useAuth();
    let location = useLocation();
    if (auth.token) {
        return <Navigate to="/p/product" state={{ from: location }} replace />;
    }

    return children;
}

export default NoneAuth;