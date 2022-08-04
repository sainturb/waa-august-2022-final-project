import React from 'react';
import {useAuth} from "../App";
import AccessDenied from "../public/AccessDenied";

function RequireUserRole({ children, ...rest }) {
    let auth = useAuth();
    let realm_access = JSON.parse(auth.user).realm_access;
    let roles = realm_access ? realm_access.roles : [];
    if (!roles.includes('user')) {
        return <AccessDenied />;
    }
    return children;
}

export default RequireUserRole;