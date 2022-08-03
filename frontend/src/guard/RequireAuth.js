import React from 'react';
import {useAuth} from "../App";

const client = 'alumni';
const url = `http://localhost:8081/auth/realms/${client}/protocol/openid-connect/auth?response_type=token&client_id=${client}&redirect_uri=http://localhost:3000/callback`

function RequireAuth({ children, ...rest }) {
    let auth = useAuth();
    if (!auth.token) {
        window.location.href = url;
        return null;
    }
    return children;
}

export default RequireAuth;