import React from 'react';
import { Routes, Route } from "react-router-dom";
import Page from "./Page";

function Private () {
    return (
        <Routes>
            <Route path={''} element={<Page />}/>
        </Routes>
    )
}

export default Private;
