import React from 'react';
import 'react-html5video/dist/styles.css';
import './Video.css';

const video = (props) => {

    const videoTag = React.createRef();

    return (
        <div className='videoWrap'>
            <div className='slogan'>
                <p>Jams on you,</p>
                <p>The lowest price on us</p>
            </div>
            <div className='popular'>
                <p>Popular on Jam Booker</p>
            </div>
            <img onClick={(event) => props.click(event, videoTag)}
                className={props.isMuted ? 'sound' : 'sound muted'}
                alt='sound Button'
                src={props.sound} />
            <video
                className='video'
                autoPlay
                muted     
                loop
                src={props.src}
                ref={videoTag}
            />
        </div>)
};

export default video;