import React from 'react';

const Greeting = props => {
    const { isSignedIn, usersName } = props;

    if (!isSignedIn) {
        return <h1>{"Welcome to Facefacts"}</h1>;
    }

    return <h1>{`Hi ${usersName}`}</h1>;
};

export default Greeting;