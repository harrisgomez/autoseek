import React from 'react';
import './greeting.css';

const Greeting = ({ isSignedIn, name }) => {
    console.log(name);
    
    if (isSignedIn) {
        const capitalizedName = name[0].toUpperCase() + name.slice(1);

        return <h1>{`Hi ${capitalizedName}`}</h1>;
    }
    
    return <div className='hide'><h1>{"Welcome to Autoseek"}</h1></div>;
};

export default Greeting;