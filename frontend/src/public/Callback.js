import React, {useEffect} from "react";
import {useAuth} from "../App";

function Callback () {
    const auth = useAuth();
    useEffect(() => {
        let paramStrings = window.location.search;
        if (window.location.href.split('#').length > 0) {
            paramStrings = window.location.href.split('#')[1]
        }
        const queryParams = new URLSearchParams(paramStrings);
        queryParams.forEach((value, key) => {
            localStorage.setItem(key, value);
        });
        auth.signIn(window.atob(queryParams.get('access_token').split('.')[1]), () => {
            window.location.replace('/');
        });
    },[])
    return (
        <div>
            Callback processing
        </div>
    )
}

export default Callback;