import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { app, particleOptions } from './constants/constants';
import './App.css';
import 'tachyons';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlVal: ''
        };
    }

    handleUrlChange = (e) => {
        this.setState({ urlVal: e.target.value });
    };

    handleUrlSubmit = () => {
        app.models.predict(
            Clarifai.COLOR_MODEL,
            "https://samples.clarifai.com/face-det.jpg"
        ).then(
            function (response) {
                console.log(response);
            },
            function (err) {
                // there was an error
            }
        );

    };

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particleOptions} />
                <Navigation />
                <Logo />
                <ImageLinkForm
                    onUrlChange={this.handleUrlChange}
                    urlVal={this.state.urlVal}
                    onUrlSubmit={this.handleUrlSubmit}
                />
                <FaceRecognition />
            </div>
        );
    }
}

export default App;
