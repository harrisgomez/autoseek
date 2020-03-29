import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Logo from "../components/Logo/Logo";
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { app, particleOptions } from '../constants/constants';
import './App.css';
import 'tachyons';

class App extends Component {
    state = {
        urlInput: '',
        imgUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false
    };

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(res => res.json())
            .then(json => console.log(json));
    }

    handleUrlChange = (e) => {
        this.setState({ urlInput: e.target.value });
    };

    handleUrlSubmit = () => {
        this.setState({ imgUrl: this.state.urlInput });
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.urlInput
        )
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    };

    handleRouteChange = route => {
        if (route === 'signin') {
            this.setState({ isSignedIn: false });
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }
        this.setState({ route });
    };

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
    };

    displayFaceBox = (box) => {
        this.setState({ box });
    };

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particleOptions} />
                <Navigation onRouteChange={this.handleRouteChange} isSignedIn={this.state.isSignedIn} />
                <Logo />
                {this.state.route === 'signin'
                    ? <Signin onRouteChange={this.handleRouteChange} />
                    : this.state.route === 'register'
                        ? <Register onRouteChange={this.handleRouteChange} />
                        : (
                            <div>
                                <ImageLinkForm
                                    onUrlChange={this.handleUrlChange}
                                    urlInput={this.state.urlInput}
                                    onUrlSubmit={this.handleUrlSubmit}
                                />
                                <FaceRecognition imgUrl={this.state.imgUrl} box={this.state.box} />
                            </div>
                        )
                }
            </div>
        );
    }
}

export default App;
