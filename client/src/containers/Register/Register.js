import React, { Component } from 'react';
import { handleFetchErrorsUtil } from '../../utils';
import { githubUserDb } from '../../res';
import './Register.css';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    componentDidMount() {
        console.log('REG', process);
        
    }

    onNameChange = e => {
        this.setState({ name: e.target.value });
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    handleRegisterSubmit = () => {
        const { loadUser, onRouteChange } = this.props;
        const { name, email, password } = this.state;

        console.log('process', process);
        console.log('document', document);
        
        console.log('REG', process);
        

        // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        //     const { name, email, password } = this.state;
        //     const newUser = new User(name, email, password).register();
            
        //     loadUser(newUser);
        //     onRouteChange('home');
        // } else {
            
            // fetch('/api/register', {
            //     method: 'post',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email, password })
            // })
            //     .then(handleFetchErrorsUtil)
            //     .then(user => {
            //         console.log(user);
                    
            //         if (user.id) {
            //             console.log(user.id);
                                 
            //             loadUser(user);
            //             onRouteChange('home');
            //         }
            //     })
            //     .catch(console.error);
            
        // }

    }

    render() {
        const { name, email, password } = this.state;

        return (
            <article className="register signin br3 ba b--black-10 mw6 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input
                                    id="name"
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Email</label>
                                <input
                                    id="email"
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div>
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Register"
                                onClick={this.handleRegisterSubmit}
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default Register;