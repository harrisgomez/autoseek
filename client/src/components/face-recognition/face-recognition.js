import React from 'react';
import './face-recognition.css';

const FaceRecognition = ({ imgUrl, boxesArr }) => {
    return (
        <div className="face-container center ma">
            <div className='absolute mt2'>
                {imgUrl && <img id='inputImg' src={imgUrl} alt="sample" width='500px' height='auto' />}
                {boxesArr && boxesArr.map(box => {
                    return (
                        <div
                            key={box.id}
                            className='bounding-box'
                            style={{
                                top: box.topRow,
                                right: box.rightCol,
                                bottom: box.botRow,
                                left: box.leftCol
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default FaceRecognition;