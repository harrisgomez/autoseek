import React from 'react';
import Tilt from 'react-tilt';
import brochure from './brochure_icon.png'
import './Logo.css';

export const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className='Tilt br2 shadow-2' options={{ max: 50 }} style={{ display: 'flex', height: 150, width: 150 }}>
                <div className="Tilt-inner center pa2"><img style={{ paddingTop: '2px' }} src={brochure} alt="logo" /></div>
            </Tilt>
        </div>
    );
};

export default Logo;