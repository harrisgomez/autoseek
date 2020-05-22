import React, { Component } from 'react';
import Navigation from './components/nav/navigation';
import Header from './components/header/header';
import SignIn from './containers/sign-in/sign-in';
import Register from './containers/register/register';
import FaceRecognition from './components/face-recognition/face-recognition';
import ImageLinkForm from './components/image-link-form/image-link-form';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import { particlesConfig } from './lib';
import './app.css';
import 'tachyons';

export const clarifaiApp = new Clarifai.App({
    apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

const initState = {
    urlInput: '',
    imgUrl: '',
    boxesArr: [],
    route: 'signIn',
    isSignedIn: false,
    user: {
        name: ''
    }
};

class App extends Component {
    state = initState;

    loadUser = user => {  
        const name = user && user.name;
        
        this.setState({ user: { name } });
    }

    handleUrlChange = e => {
        this.setState({ urlInput: e.target.value });
    }

    handleUrlSubmit = () => {
        const { urlInput } = this.state;

        this.setState({ imgUrl: urlInput });

        clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, urlInput)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(console.error);
    }

    handleRouteChange = route => {
        if (route === 'signIn') {
            this.setState(initState);
        } else if (route === 'home') {
            this.setState({ isSignedIn: true });
        }

        this.setState({ route });
    }

    calculateFaceLocation = (data) => {
        const img = document.getElementById('inputImg');
        const width = Number(img.width);
        const height = Number(img.height);
        const boxRegionsArr = data.outputs[0].data.regions;
        const boundingBoxArr = boxRegionsArr.map(region => {
            const {
                left_col,
                top_row,
                right_col,
                bottom_row
            } = region.region_info.bounding_box;
            
            return {
                id: region.id,
                leftCol: left_col * width,
                topRow: top_row * height,
                rightCol: width - (right_col * width),
                botRow: height - (bottom_row * height)
            };
        });

        return boundingBoxArr;
    }

    displayFaceBox = boxes => {
        this.setState({ boxes });
    }

    render() {
        const {
            isSignedIn,
            route,
            urlInput,
            imgUrl,
            boxes,
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
                        'signIn': <SignIn loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />,
                        'register': <Register loadUser={this.loadUser} onRouteChange={this.handleRouteChange} />,
                        'home': (
                            <div>
                                <ImageLinkForm
                                    urlInput={urlInput}
                                    onUrlChange={this.handleUrlChange}
                                    onUrlSubmit={this.handleUrlSubmit}
                                />
                                <FaceRecognition imgUrl={imgUrl} boxArr={boxes} />
                            </div>
                        )
                    }[route]
                }
            </div>
        );
    }
}

export default App;
