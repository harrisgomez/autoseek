import React from 'react';
import Tilt from 'react-tilt';
import { tiltConfig } from '../../lib';
import { brochure } from './../../res';
import './logo.css';

const Logo = () => {
    return (
        <Tilt
            className='tilt br2 shadow-5 ml4 mb4'
            options={tiltConfig.options}
        >
            <div className='relative'>
                <img className='brochure' src={brochure} alt="logo" />
            </div>
        </Tilt>
    );
};

export default Logo;