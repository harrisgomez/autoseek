// Use this utility function to apply the Tilt effect to components
// Also resolves deprecated findDOMNode() warning
import React from 'react';
import Tilt from 'react-tilt';

export default wrappedComponent => {
    const tiltOptions = { max: 50 };
    const tiltStyles = {
        display: 'flex',
        height: 125,
        width: 125
    };

    return (
        <Tilt className='tilt br2 shadow-2' options={tiltOptions} style={tiltStyles}>
            <div className="tilt-inner center pa2">
                {wrappedComponent}
            </div>
        </Tilt>
    )
};