import React from 'react';
import './greeting.css';

const Greeting = ({ isSignedIn, name }) => {
    if (!isSignedIn) {
        return <div className='hide'><h1>{"Welcome to Facefacts"}</h1></div>;
    }

    return <h1>{`Hi ${name}`}</h1>;
};

export default Greeting;