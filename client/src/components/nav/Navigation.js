import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (isSignedIn
        ? (
            <nav className='nav mb4 shadow-2'>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signIn')}>Sign Out</p>
            </nav>
        ) : (
            <div>
                <nav className='nav shadow-2 mb4'>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signIn')}>Sign In</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
                </nav>
            </div>
        )
    );
};

export default Navigation;