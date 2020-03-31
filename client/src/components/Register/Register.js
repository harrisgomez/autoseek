import React, { Component } from 'react';

class Register extends Component {
    state = {
        email: '',
        password: '',
        name: ''
    };

    onNameChange = e => {
        console.log(e.target.value);

        this.setState({ name: e.target.value })
    }

    onEmailChange = e => {
        console.log(e.target.value);

        this.setState({ email: e.target.value })
    }

    onPasswordChange = e => {
        console.log(e.target.value);

        this.setState({ password: e.target.value })
    }

    handleRegisterSubmit = () => {
        console.log('registering');

        fetch('/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(res => res.json())
            .then(user => {
                console.log(user);
                if (user) {
                    this.props.onRouteChange('home');
                }
            })
            .catch(console.error);
    }

    render() {
        return (
            <article className="signin br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
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
                                    value={this.state.name}
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
                                    value={this.state.email}
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
                                    value={this.state.password}
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