import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {darkTheme, lightTheme} from "../redux/themeSlice";

function Page () {
    const theme = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    const [testState, setTestState] = useState('started');
    const test = async () => {
        // const response = await axios('api/test');
        // setTestState(response.data);
    }

    const toggleTheme = () => {
        dispatch(theme === 'light' ? darkTheme() : lightTheme());
    }

    useEffect(() => {
        test();
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <button className="btn">Decline</button>
            <button className="btn">Accept</button>
            <div>
                <input type={"checkbox"} onChange={() => toggleTheme()}/>{theme}
            </div>
            <div>{testState}</div>
        </>
    )
}

export default Page;