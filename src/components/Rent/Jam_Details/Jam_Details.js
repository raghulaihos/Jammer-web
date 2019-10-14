import React from 'react';
import './Jam_Details.css';
import axios from '../../../hoc/axios/axios-jamcards';
import Equipment from '../Equipments/Equipments';
import Slots from '../Slots/Slots';
import Confirm_Booking from '../Confirm_Booking/Confirm_Booking';
import BJ1 from '../../../assets/Bread and Jaam/cables.jpg';
import BJ2 from '../../../assets/Bread and Jaam/console.jpg';
import BJ3 from '../../../assets/Bread and Jaam/drums.jpg';
import BJ4 from '../../../assets/Bread and Jaam/amplifier.jpg';
import AS1 from '../../../assets/Astral Studios/cables.jpg';
import AS2 from '../../../assets/Astral Studios/console.jpg';
import AS3 from '../../../assets/Astral Studios/drums.jpg';
import AS4 from '../../../assets/Astral Studios/amplifier.jpg';
import BBH1 from '../../../assets/Boom Box House/cables.jpg';
import BBH2 from '../../../assets/Boom Box House/console.jpg';
import BBH3 from '../../../assets/Boom Box House/drums.jpg';
import BBH4 from '../../../assets/Boom Box House/amplifier.jpg';
import AA1 from '../../../assets/Audio Academy/cables.jpg';
import AA2 from '../../../assets/Audio Academy/console.jpg';
import AA3 from '../../../assets/Audio Academy/drums.jpg';
import AA4 from '../../../assets/Audio Academy/amplifier.jpg';


class Jam_Details extends React.Component {

    state = {
        equipment: [],
        total_price: 0,
        pics: [],
        BJ: [BJ1, BJ2, BJ3, BJ4],
        AS: [AS1, AS2, AS3, AS4],
        BBH: [BBH1, BBH2, BBH3, BBH4],
        AA: [AA1, AA2, AA3, AA4],
        pic_src: [],
        slots: [],
        confirm_booking: false
    }

    componentDidMount() {
        let token = localStorage.getItem('token');

        axios.get('/room_details?room_name=' + this.props.room_name, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            let eqs = [];
            if (this.props.room_name === 'Bread and Jaam') {
                let arr = [...this.state.BJ];
                this.setState({ pic_src: arr });
            } else if (this.props.room_name === 'Astral Studios') {
                let arr = [...this.state.AS];
                this.setState({ pic_src: arr });
            } else if (this.props.room_name === 'Boom Box House') {
                let arr = [...this.state.BBH];
                this.setState({ pic_src: arr });
            } else if (this.props.room_name === 'Audio Academy') {
                let arr = [...this.state.AA];
                this.setState({ pic_src: arr });
            }
            for (const key in res.data.equipment) {
                eqs.push({
                    key: res.data.equipment[key],
                    id: key
                })
            }
            this.setState({ equipment: eqs });
        }).catch(e => console.log('error!!!', e));

        axios.get('/slots?room_name=' + this.props.room_name, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res => {
            const slot_arr = Object.keys(res.data.slots).map(i => res.data.slots[i])
            this.setState({ slots: slot_arr });
        }).catch(e => console.log('error!!!', e));
    }

    slot_click_handler = (slot) => {
        let arr = [...this.state.slots];
        if (arr[slot] === 'open') {
            arr[slot] = 'booked';
        } else if (arr[slot] === 'booked') {
            arr[slot] = 'open';
        }
        let filt = arr.filter(val => val === 'booked');
        let count = filt.length;
        this.setState({ slots: arr, total_price: count * this.props.price });
    }

    confirm_booking_handler = () => {
        if(this.state.total_price>0)
        this.setState(prev => ({
            confirm_booking: !prev.confirm_booking
        }))
    }

    send_booking_handler = () => {
        let token = localStorage.getItem('token');
        let slots = this.state.slots;
        let data = {
            slots:slots,
            room_name:this.props.room_name
        }
    
        axios.put('/book', data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res=>{
            const slot_arr = Object.keys(res.data.rows[0].slots).map(i => res.data.rows[0].slots[i])
            this.setState({ slots: slot_arr });
            this.confirm_booking_handler();
        })
    }

    render() {
        let booking;
        if (this.state.confirm_booking) {
            // eslint-disable-next-line react/jsx-pascal-case
            booking = (<Confirm_Booking confirm_click={this.send_booking_handler} cancel_click={this.confirm_booking_handler}
                total_price={this.state.total_price}></Confirm_Booking>)
        }
        return (
            <div className="details_wrap">
                <p>{this.props.room_name}</p>
                <div className="img1_wrapper">
                    <img src={this.state.pic_src[0]} alt='cables' className="img"></img>
                    <img src={this.state.pic_src[1]} alt='console' className="img"></img>
                </div>
                <div className="img2_wrapper">
                    <img src={this.state.pic_src[2]} alt='drums' className="img"></img>
                    <img src={this.state.pic_src[3]} alt='amplifier' className="img"></img>
                </div>
                <Equipment click={this.confirm_booking_handler} total_price={this.state.total_price} {...this.props} equipment={this.state.equipment} />
                <Slots click={this.slot_click_handler} slots={this.state.slots} />
                {booking}
            </div>
        )
    }
}

export default Jam_Details;