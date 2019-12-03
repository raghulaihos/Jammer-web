import React, { Component } from 'react';
import Video from '../../components/Video/Video';
import soundSrc from '../../assets/sound.png';
import JamCards from '../../components/Jamcards/Jamcards';
import './Home.css';
import axios from '../../hoc/axios/axios-jamcards';
import jamroom1 from '../../assets/jamroom1.jpg';
import jamroom2 from '../../assets/jamroom2.jpg';
import jamroom3 from '../../assets/jamroom3.jpg';
import jamroom4 from '../../assets/jamroom4.jpg';
import vidSrc from '../../assets/enter-sandman.mp4';
import Footer from '../../components/Footer/Footer';
const jam_room_pics = [jamroom1,jamroom2,jamroom3,jamroom4];

class home extends Component {
    state = {
        jampads: [],
        muted: false
    };

    soundClickHandler = (event, videoTag) => {
        this.setState(prev => {
            return { muted: !prev.muted };
        })
        videoTag.current.muted = this.state.muted;
    }

    componentDidMount() {
      
        axios.get('/jamcards')
            .then(res => {
                const jam_cards = [];
                for(const key in res.data.jamcards){
                    jam_cards.push({
                        ...res.data.jamcards[key],
                        pic: jam_room_pics[key],
                        id: key
                    })
                }
                
                this.setState({jampads:jam_cards});
            }).catch(e=>console.log('error!!!',e));

    }

    render() {
        return (
            <React.Fragment>
            <div className='home'>
                <Video isMuted={this.state.muted} click={this.soundClickHandler} src={vidSrc} sound={soundSrc} />
                <JamCards cards={this.state.jampads} />
            </div>
                <Footer></Footer>
                </React.Fragment>
        );
    }
}

export default home;