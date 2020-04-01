import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Header from './Header/Header';
import Greeting from '../components/Greeting/Greeting';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { particleOptions } from '../constants/constants';
import './App.css';
import 'tachyons';

export const clarifaiApp = new Clarifai.App({
    apiKey: `${process.env.REACT_APP_CLARIFAI_KEY}`
});

class App extends Component {
    state = {
        urlInput: '',
        imgUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
            name: '',
            album: []
        }
    };

    componentDidMount() {
        fetch(`http://localhost:8000`)
            .then(res => res.json())
            .then(json => console.log(json));
    }

    loadUser = user => {
        const { name, album } = user;
        console.log('loaded', name, album);

        this.setState(Object.assign(this.state.user, {
            name, album
        }));
    }

    handleUrlChange = (e) => {
        this.setState({ urlInput: e.target.value });
    }

    handleUrlSubmit = () => {
        this.setState({ imgUrl: this.state.urlInput });

        clarifaiApp.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.urlInput
        )
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
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

    displayFaceBox = (box) => {
        this.setState({ box });
    }

    /* 
    todo    Specific (Header) renders Greeting (Greeting)
    todo    Greeting renders user name and album from props
    */

    render() {
        const {
            isSignedIn,
            route,
            urlInput,
            imgUrl,
            box,
            user: { name: usersName }
        } = this.state;

        return (
            <div className="App">
                <Particles className='particles' params={particleOptions} />
                <Navigation onRouteChange={this.handleRouteChange} isSignedIn={isSignedIn} />
                <Header
                    greeting={<Greeting isSignedIn={isSignedIn} usersName={usersName} />}
                />
                {route === 'signin'
                    ? <Signin loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />
                    : route === 'register'
                        ? <Register loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />
                        : (
                            <div>
                                <ImageLinkForm
                                    urlInput={urlInput}
                                    onUrlChange={this.handleUrlChange}
                                    onUrlSubmit={this.handleUrlSubmit}
                                />
                                <FaceRecognition imgUrl={imgUrl} box={box} />
                            </div>
                        )
                }
            </div>
        );
    }
}

export default App;
