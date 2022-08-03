import React, {useEffect, useState} from 'react';
import axios from "axios";

function Page () {
    const [testState, setTestState] = useState('started');
    const test = async () => {
        const response = await axios('api/test');
        setTestState(response.data);
    }

    useEffect(() => {
        test();
    }, [])

    return (
        <>
            <div>Page</div>
            <div>{testState}</div>
        </>
    )
}

export default Page;