import React from 'react';
import './greeting.css';

const Greeting = ({ isSignedIn, name }) => {
    if (isSignedIn) {
        return <h1>{`Hi ${name}`}</h1>;
    }
    
    return <div className='hide'><h1>{"Welcome to Xpunge"}</h1></div>;
};

export default Greeting;