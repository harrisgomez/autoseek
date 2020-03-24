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
    state = {
        urlInput: '',
        imgUrl: '',
        box: {}
    };

    handleUrlChange = (e) => {
        this.setState({ urlInput: e.target.value });
    };

    //* https://samples.clarifai.com/face-det.jpg
    handleUrlSubmit = () => {
        this.setState({ imgUrl: this.state.urlInput });
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.urlInput
        )
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
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
                <Navigation />
                <Logo />
                <ImageLinkForm
                    onUrlChange={this.handleUrlChange}
                    urlInput={this.state.urlInput}
                    onUrlSubmit={this.handleUrlSubmit}
                />
                <FaceRecognition imgUrl={this.state.imgUrl} box={this.state.box} />
            </div>
        );
    }
}

export default App;
