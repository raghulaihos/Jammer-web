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

const jam_room_pics = [jamroom1,jamroom2,jamroom3,jamroom4];
const vidSrc = 'https://p-def3.pcloud.com/cfZtww7UYZNtlC4mZHWarZZadfYN7ZQ5ZZuH0ZZeKrYzZQ5ZCkZX7ZW7ZHkZgJZK5ZI7Zp5Z80ZXFZH0ZpZTXZPGQ25YH4bfRil1Mzug6MUjN2uhPV/enter-sandman.mp4';
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
                for(const key in res.data){
                    jam_cards.push({
                        ...res.data[key],
                        pic: jam_room_pics[key],
                        id: key
                    })
                }
                
                this.setState({jampads:jam_cards});
            }).catch(e=>console.log('error!!!',e));
    }

    render() {
        return (
            <div className='home'>
                <Video isMuted={this.state.muted} click={this.soundClickHandler} src={vidSrc} sound={soundSrc} />
                <JamCards cards={this.state.jampads} />
            </div>
        );
    }
}

export default home;