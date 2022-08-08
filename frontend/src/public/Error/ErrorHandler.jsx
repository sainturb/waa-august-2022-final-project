import React from 'react';
import Message from './Message';

function ErrorHandler({error, resetErrorBoundary}) {
    const msg = {
        title: error.name,
        body: error.message
    };
    console.log("displaying error message");
    return ( <Message msg={msg} /> );
}

export default ErrorHandler;