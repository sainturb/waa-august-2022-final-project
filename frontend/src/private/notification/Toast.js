import React, {useEffect, useState} from 'react';

function Toast ({variant, children}) {
    const [toast, setToast] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 3000);

        // To clear or cancel a timer, you call the clearTimeout(); method,
        // passing in the timer object that you created into clearTimeout().

        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {toast && <div>{children}</div>}
        </>
    )
}
export default Toast;