import React, { Component } from 'react';
import Navigation from '../components/nav/Navigation';
import Header from '../components/header/Header.js';
import SignIn from './signIn/SignIn';
import Register from './register/Register';
import ImageLinkForm from '../components/imageLinkForm/ImageLinkForm';
import FaceRecognition from "../components/faceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { particlesConfig } from '../lib';
import './App.css';
import 'tachyons';

export const clarifaiApp = new Clarifai.App({
    apiKey: `${process.env.REACT_APP_CLARIFAI_KEY}`
});

const initState = {
    inputUrl: '',
    imgUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        name: '',
        album: []
    }
};

class App extends Component {
    state = initState;

    loadUser = user => {
        const { name, album } = user;

        this.setState(Object.assign(this.state.user, {
            name, album
        }));
    }

    handleUrlChange = e => {
        this.setState({ inputUrl: e.target.value });
    }

    handleUrlSubmit = () => {
        const { inputUrl } = this.state;

        this.setState({ imgUrl: inputUrl });

        clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, inputUrl)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(console.error);
    }

    handleRouteChange = route => {
        if (route === 'signin') {
            this.setState({ isSignedIn: false });
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }

        this.setState({ route });
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const img = document.getElementById('inputImg');
        const width = Number(img.width);
        const height = Number(img.height);

        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            botRow: height - (clarifaiFace.bottom_row * height)
        };
    }

    displayFaceBox = box => {
        this.setState({ box });
    }

    render() {
        const {
            isSignedIn,
            route,
            urlInput,
            imgUrl,
            box,
            user: { name: usersName }
        } = this.state;

        // * Testing out the enumerable alternative of conditional rendering. Looks much nicer.

        return (
            <div className="App">
                <Particles className='particles' params={particlesConfig} />
                <Navigation onRouteChange={this.handleRouteChange} isSignedIn={isSignedIn} />
                <Header usersName={usersName} />
                {
                    {
                        'signin': <SignIn loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />,
                        'register': <Register loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />,
                        'home': (
                            <div>
                                <ImageLinkForm
                                    urlInput={urlInput}
                                    onUrlChange={this.handleUrlChange}
                                    onUrlSubmit={this.handleUrlSubmit}
                                />
                                <FaceRecognition imgUrl={imgUrl} box={box} />
                            </div>
                        )
                    }[route]
                }
            </div>
        );
    }
}

export default App;
