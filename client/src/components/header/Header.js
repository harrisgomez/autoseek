import React from 'react';
import Logo from '../logo/Logo';
import Greeting from '../greeting/Greeting';

const Header = ({ isSignedIn, usersName }) => {
    return (
        <div className='f4 white relative z-0'>
            <Logo />
            <Greeting isSignedIn={isSignedIn} usersName={usersName} />
        </div>
    );
};

export default Header;