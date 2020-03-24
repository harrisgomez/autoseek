import React from 'react';
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
    return (
        <div className='form shadow-5 w-60 center tc' style={{ 'border': '1px solid red' }}>
            <div>
                <p className="f3">
                    {'This Magic Album will detect faces in your pictures. Upload a photo or an entire album and give it a try!'}
                </p>
                <div className='pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-50' type="text" />
                    <button className='grow f4 link dib ph3 pv2 white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;