import React from 'react';
import Logo from '../logo/logo';
import Greeting from '../greeting/greeting';

const Header = ({ isSignedIn, user }) => {
    console.log('HEADER', user);
    
    return (
        <div className='f4 white relative z-0'>
            <Logo />
            <Greeting isSignedIn={isSignedIn} name={user && user.name} />
        </div>
    );
};

export default Header;