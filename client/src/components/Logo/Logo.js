import React from 'react';
import brochure from './brochure_icon.png';
import { withTilt } from '../../utils';
import './Logo.css';

const Logo = () => {
    return <img style={{ paddingTop: '2px' }} src={brochure} alt="logo" />;
};

withTilt(Logo);

export default Logo;