import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';
import 'tachyons';

const particleOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 1200,
                draw: true
            }
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            }
        },
        modes: {
            repulse: {
                distance: 200
            }
        }
    }
};

function App() {
    return (
        <div className="App">
            <Particles className='particles' params={particleOptions} />
            <Navigation />
            <Logo />
            <ImageLinkForm />
            {/* <FaceRecognitin /> */}
        </div>
    )
}

export default App;
