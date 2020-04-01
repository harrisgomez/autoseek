import React from 'react';

const Greeting = props => {
    const { isSignedIn, usersName } = props;
    const message = !isSignedIn
        ? "Welcome to Facefacts"
        : `Hi ${usersName}`;
    
    return <div>{message}</div>;
};

export default Greeting;