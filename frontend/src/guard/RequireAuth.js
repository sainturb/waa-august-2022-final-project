import React from 'react';
import {useAuth} from "../App";

function RequireAuth({ children, ...rest }) {
    let auth = useAuth();
    if (!auth.user) {
        window.location.href = process.env.REACT_APP_AUTH_URL;
        return null;
    }
    return children;
}

export default RequireAuth;