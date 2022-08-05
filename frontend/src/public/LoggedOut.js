import React, {useEffect} from "react";
import {useAuth} from "../App";
import {useNavigate} from "react-router";

function LoggedOut () {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        auth.signOut();
        navigate('/public');
    },[])
    return (
        <div>
            Logged out processing
        </div>
    )
}

export default LoggedOut;