import React, { Component } from 'react';
import Logo from '../../components/Logo/Logo';
import Greeting from '../../components/Greeting/Greeting';

const Header = ({isSignedIn, usersName}) => {
    return (
        <div className='f1 white relative z-0'>
            <Logo />
            <Greeting isSignedIn={isSignedIn} usersName={usersName} />
        </div>
    );
};

export default Header;