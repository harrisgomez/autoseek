import React from 'react';

const ImageLinkForm = () => {
    return (
        <div>
            <div className='center w-60'>
                <p className="f3 flex justify-around">
                    {'This Magic Album will detect faces in your pictures. Upload a photo or an entire album and give it a try!'}
                </p>
            </div>
            <div>
                <div className='form center w-60 pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type="text" />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;