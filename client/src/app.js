import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './components/nav/navigation';
import Header from './components/header/header';
import SignIn from './containers/sign-in/sign-in';
import Register from './containers/register/register';
import FaceRecognition from './components/face-recognition/face-recognition';
import ImageLinkForm from './components/image-link-form/image-link-form';
import Particles from 'react-particles-js';
import { particlesConfig } from './lib';
import './app.css';
import 'tachyons';

import {
    detectFaces,
    loadUser,
    changeRoute
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
            route,
            boxesArr,
            isSignedIn,
            handleLoadUser,
            handleRouteChange
        } = this.props;
        
        // * Testing out the enumerable alternative of conditional rendering. Looks much nicer.

        return (
            <div className="App">
                <Particles className='particles' params={particlesConfig} />
                <Navigation onRouteChange={handleRouteChange} isSignedIn={isSignedIn} />
                <Header user={user} />
                {
                    {
                        'signIn': <SignIn onLoadUser={handleLoadUser} onRouteChange={handleRouteChange} />,
                        'register': <Register onLoadUser={handleLoadUser} onRouteChange={handleRouteChange} />,
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

const mapState = state => {
    return {
        user: state.user.userInfo,
        route: state.route.path,
        boxesArr: state.image.boxes,
        isSignedIn: state.isSignedIn
    };
};

const mapDispatch = dispatch => ({
    handleLoadUser: user => dispatch(loadUser(user)),
    handleRouteChange: route => dispatch(changeRoute(route)),
    handleImgUrlSubmit: imgUrl => dispatch(detectFaces(imgUrl)) // Requires thunk to dispatch async fn()
});

export default connect(mapState, mapDispatch)(App);
