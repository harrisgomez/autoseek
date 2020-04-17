import React, { Component } from 'react';
import './SignIn.css';

import { handleFetchErrorsUtil } from '../../utils';

class SignIn extends Component {
    state = {
        signInEmail: 'ash@gmail.com',
        signInPassword: 'pika'
    }

    onEmailChange = e => {
        this.setState({ signInEmail: e.target.value });
    }

    onPasswordChange = e => {
        this.setState({ signInPassword: e.target.value });
    }

    handleSignInSubmit = () => {
        fetch('/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(handleFetchErrorsUtil)
            .then(user => {
                console.log(user);
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            })
            .catch(console.error);
    }

    render() {
        const { onRouteChange } = this.props;

        return (
            <article className="signin br3 ba b--black-10 mv6 w-100 w-50-m w-50-l mw6 shadow-5 center z-0">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    id="email-address"
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    value={this.state.signInEmail}
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
                                    value={this.state.signInPassword}
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.handleSignInSubmit}
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

export default SignIn;