import React from 'react';
import Tilt from 'react-tilt';
import brochure from './brochure_icon.png';
import './Logo.css';

export const Logo = () => {
    return (
        <div className="ml4 mt0">
            <Tilt className='tilt br2 shadow-2' options={{ max: 50 }} style={{ display: 'flex', height: 125, width: 125 }}>
                <div className="tilt-inner center pa2"><img style={{ paddingTop: '2px' }} src={brochure} alt="logo" /></div>
            </Tilt>
        </div>
    );
};

export default Logo;