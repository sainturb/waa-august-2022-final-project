import React, {useEffect} from "react";

function Callback () {
    useEffect(() => {
        let paramStrings = window.location.search;
        if (window.location.href.split('#').length > 0) {
            paramStrings = window.location.href.split('#')[1]
        }
        const queryParams = new URLSearchParams(paramStrings);
        queryParams.forEach((value, key) => {
            localStorage.setItem(key, value);
        });
        window.location.assign('/');
    },[])
    return (
        <div>
            Callback processing
        </div>
    )
}

export default Callback;