import React from 'react';
import './greeting.css';

const Greeting = props => {
    const { isSignedIn, usersName } = props;

    if (!isSignedIn) {
        return <div className='hide'><h1>{"Welcome to Facefacts"}</h1></div>;
    }

    return <h1>{`Hi ${usersName}`}</h1>;
};

export default Greeting;