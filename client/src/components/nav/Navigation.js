import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    return (isSignedIn
        ? (
            <nav className='nav' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>
            </nav>
        ) : (
            <div>
                <nav className='nav'>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
                </nav>
            </div>
        )
    );
};

export default Navigation;