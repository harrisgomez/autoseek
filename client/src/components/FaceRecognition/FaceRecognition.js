import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, box }) => {
    return (
        <div className="center ma" style={{ position: 'relative' }}>
            <div className='absolute mt2'>
                {imgUrl && <img id='inputImg' src={imgUrl} alt="sample" width='500px' height='auto' />}
                <div
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        right: box.rightCol,
                        bottom: box.botRow,
                        left: box.leftCol
                    }}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;