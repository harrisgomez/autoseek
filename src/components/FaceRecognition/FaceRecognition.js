import React from 'react';

const FaceRecognition = ({ imgUrl }) => {
    return (
        <div className="center ma" style={{ position: 'relative' }}>
            <div className='absolute mt2'>
                {imgUrl && <img src={imgUrl} alt="sample" width='500px' height='auto' />}

            </div>
        </div>
    );
}

export default FaceRecognition;