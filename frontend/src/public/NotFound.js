import React from "react";
import {useNavigate} from "react-router";

function NotFound() {

    const navigate = useNavigate();
    
    return (
        <div className="container">
            <div className="text-center mr-96">
                <div className="text-6xl font-sans text-black">404</div>
                <div className="text-slate-500">
                    Oops! We can't seem to find the page you are looking for
                </div><br></br>
                <a href="" className="no-underline hover:underline hover:text-blue-500" onClick={() => navigate('')} >Back to Home</a>
            </div>
        </div>
    )
}

export default NotFound;