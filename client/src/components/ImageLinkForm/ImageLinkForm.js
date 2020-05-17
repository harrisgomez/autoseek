import React from 'react';
import "./imageLinkForm.css";

const ImageLinkForm = ({ onUrlChange, urlInput, onUrlSubmit }) => {
    return (
        <div className='form w-60 center tc'>
            <div>
                <p className="f3">
                    {'Paste a link to any image and watch the magic of facial recognition go to work.'}
                </p>
                <p className='f3'>{'Try it out!'}</p>
                <div className='pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-50' type="text" onChange={onUrlChange} value={urlInput} />
                    <button className='grow f4 link dib ph3 pv2 white bg-light-purple' onClick={onUrlSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;