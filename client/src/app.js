import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/nav/navigation';
import Header from './components/header/header';
import Signin from './containers/signin/signin';
import Register from './containers/register/register';
import FaceRecognition from './components/face-recognition/face-recognition';
import ImageLinkForm from './components/image-link-form/image-link-form';
import Particles from 'react-particles-js';
import { particlesConfig } from './lib';
import './app.css';
import 'tachyons';

// ACTIONS
import {
    doLoadUser,
    doRouteChange,
    doDetectFaces,
    doRegisterSubmit,
    doSigninSubmit
} from './actions/action-creators';

class App extends Component {
    state = {
        imgUrlInput: ''
    };

    handleUrlChange = e => {
        this.setState({ imgUrlInput: e.target.value });
    }

    handleUrlSubmit = () => {
        this.props.handleImgUrlSubmit(this.state.imgUrlInput);
    }

    render() {
        const { imgUrlInput } = this.state;
        const {
            user,
            isSignedIn,
            route,
            boxesArr,
            handleRouteChange,
            handleSigninSubmit,
            handleRegisterSubmit
        } = this.props;

        // * Testing out the enumerable alternative of conditional rendering. Looks much nicer.

        return (
            <div className="App">
                <Particles className='particles' params={particlesConfig} />
                <Navigation onRouteChange={handleRouteChange} isSignedIn={isSignedIn} />
                <Header user={user} isSignedIn={isSignedIn} />
                {
                    {
                        'signin': <Signin onSigninSubmit={handleSigninSubmit} onRouteChange={handleRouteChange}/>,
                        'register': <Register onRegisterSubmit={handleRegisterSubmit} onRouteChange={handleRouteChange} />,
                        'home': (
                            <div>
                                <ImageLinkForm
                                    imgUrlInput={imgUrlInput}
                                    onUrlChange={this.handleUrlChange}
                                    onUrlSubmit={this.handleUrlSubmit}
                                />
                                <FaceRecognition imgUrl={imgUrlInput} boxesArr={boxesArr} />
                            </div>
                        )
                    }[route]
                }
            </div>
        );
    }
}

const mapState = state => ({
    user: state.user.userInfo,
    isSignedIn: state.user.isSignedIn,
    route: state.route.path,
    boxesArr: state.image.boxes
});

const mapDispatch = dispatch => ({
    handleLoadUser: user => dispatch(doLoadUser(user)),
    handleRouteChange: route => dispatch(doRouteChange(route)),
    handleImgUrlSubmit: imgUrl => dispatch(doDetectFaces(imgUrl)), // Requires thunk to dispatch async fn()
    handleRegisterSubmit: registerFormObj => dispatch(doRegisterSubmit(registerFormObj)),
    handleSigninSubmit: signinFormObj => dispatch(doSigninSubmit(signinFormObj))
});

export default connect(mapState, mapDispatch)(App);