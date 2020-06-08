import React, { Component } from 'react';
import { connect } from 'react-redux';
import './register.css';

// ACTIONS
import { onUserRegistration } from '../../actions/action-creators';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    };

    onNameChange = e => {
        this.setState({ name: e.target.value });
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    }

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    }

    render() {
        const { name, email, password } = this.state;
        const { handleRegisterSubmit } = this.props;

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
                                onClick={() => handleRegisterSubmit(this.state)}
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

const mapDispatch = dispatch => ({
    handleRegisterSubmit: userFormObj => dispatch(onUserRegistration(userFormObj))
});

export default connect(null, mapDispatch)(Register);