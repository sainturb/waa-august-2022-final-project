import React from 'react';
import {useAuth} from "../App";

const url = `http://localhost:8081/auth/realms/alumni/protocol/openid-connect/auth?response_type=token&client_id=alumni&redirect_uri=http://localhost:3000/callback`

function RequireAuth({ children, ...rest }) {
    let auth = useAuth();
    if (!auth.user) {
        window.location.href = url;
        return null;
    }
    return children;
}

export default RequireAuth;