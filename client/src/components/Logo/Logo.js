import React from 'react';
import Tilt from 'react-tilt';
import { tiltConfig } from '../../lib';
import { brochure } from '../../res';
import './Logo.css';

const Logo = () => {
    return (
        <Tilt
            className='tilt center br2 shadow-3'
            options={tiltConfig.options}
            style={tiltConfig.styles}
        >
            <div className='relative'>
                <img className='brochure' src={brochure} alt="logo" />
            </div>
        </Tilt>
    );
};

export default Logo;