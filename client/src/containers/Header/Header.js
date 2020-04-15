import React, { Component } from 'react';
import Logo from '../../components/Logo/Logo';

export default class Header extends Component {
    render() {
        return (
            <div className='f1 white'>
                <Logo />
                <h1>{this.props.greeting}</h1>
            </div>
        );
    }
};