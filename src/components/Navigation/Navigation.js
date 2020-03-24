import React from 'react';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className='nav' style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation;