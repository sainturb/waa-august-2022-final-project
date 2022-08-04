import React from 'react';
import {useAuth} from "../App";
import AccessDenied from "../public/AccessDenied";

function RequireAdminRole({ children, ...rest }) {
    let auth = useAuth();
    let realm_access = JSON.parse(auth.user).realm_access;
    let roles = realm_access ? realm_access.roles : [];
    if (!roles.includes('admin')) {
        return <AccessDenied />;
    }
    return children;
}


export default RequireAdminRole;