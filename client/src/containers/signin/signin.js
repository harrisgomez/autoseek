import React, { Component } from 'react';
import './signin.css';

class Signin extends Component {
    // Component state only used for handling controlled form input
    state = {
        email: '',
        password: ''
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    // handleSignInSubmit = () => {
    //     const {
    //         onLoadUser,
    //         onRouteChange,
    //         onSigninSubmit
    //     } = this.props;
    //     const {
    //         signInEmail: email,
    //         signInPassword: password
    //     } = this.state;

    //     if (!!window.location.hostname.match('github')) {
    //         const localUser = sessionStorage.getItem('localUser');
            
    //         onLoadUser(localUser);
    //         onRouteChange('home');
    //     }

    //     fetch('/api/signin', {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email, password })
    //     })
    //         .then(handleFetchErrorsUtil)
    //         .then(user => {
    //             if (user.id) {
    //                 onLoadUser(user);
    //                 onRouteChange('home');
    //             }
    //         })
    //         .catch(console.error);
    // }

    render() {
        const { signinEmail, signinPassword } = this.state;
        const { onRouteChange, onSigninSubmit } = this.props;

        return (
            <article className="signin br3 ba b--black-10 w-100 w-50-m w-50-l mw6 shadow-5 center relative">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    id="email-address"
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    value={signinEmail}
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
                                    value={signinPassword}
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={() => onSigninSubmit(this.state)}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default Signin;