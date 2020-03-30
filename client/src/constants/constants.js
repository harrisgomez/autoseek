import Clarifai from 'clarifai';

export const app = new Clarifai.App({
    apiKey: `${process.env.REACT_APP_SECRET_KEY}`
});

export const particleOptions = {
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