import React, {useContext, useEffect} from "react";
import {AuthContext, useAuth} from "../App";
import {useNavigate, useParams} from "react-router";

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