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
            urlInput: '',
            imgUrl: ''
        };
    }

    handleUrlChange = (e) => {
        this.setState({ urlInput: e.target.value });
    };

    handleUrlSubmit = () => {
        this.setState({ imgUrl: this.state.urlInput });
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.urlInput
            // "https://samples.clarifai.com/face-det.jpg"
        ).then(
            function (response) {
                console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
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
                    urlInput={this.state.urlInput}
                    onUrlSubmit={this.handleUrlSubmit}
                />
                <FaceRecognition imgUrl={this.state.imgUrl} />
            </div>
        );
    }
}

export default App;
