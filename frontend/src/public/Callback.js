import React, {useEffect} from "react";
import {useAuth} from "../App";
import {useNavigate, useParams} from "react-router";

function Callback () {
    const auth = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        let paramStrings = window.location.search;
        if (window.location.href.includes('#')) {
            paramStrings = window.location.href.split('#')[1]
        }
        const queryParams = new URLSearchParams(paramStrings);
        queryParams.forEach((value, key) => {
            localStorage.setItem(key, value);
        });
        auth.signIn( () => {
            navigate('/');
        });
    },[])
    return (
        <div>
            Callback processing
        </div>
    )
}

export default Callback;