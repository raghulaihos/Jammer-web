import React from 'react';
import './Jam_Details.css';
import axios from '../../../hoc/axios/axios-jamcards';
import Equipment from '../Equipments/Equipments';
import jamroom1 from '../../../assets/Bread and Jaam/cables.jpg';
import jamroom2 from '../../../assets/Bread and Jaam/console.jpg';
import jamroom3 from '../../../assets/Bread and Jaam/drums.jpg';
import jamroom4 from '../../../assets/Bread and Jaam/amplifier.jpg';

class Jam_Details extends React.Component {
  
    state = {
        equipment:[],
        price:0,
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        axios.get('/room_details?room_name='+this.props.room_name,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(res=>{
            let eqs = [];
            for (const key in res.data.equipment) {
                eqs.push({
                    key:res.data.equipment[key],
                    id: key
                })
            }
            this.setState({equipment:eqs});
            console.log(this.state);
        }).catch(e => console.log('error!!!', e));
    }
  
    render(){
        return (
            <div className="details_wrap">
            <p>{this.props.room_name}</p>
            <div className="img1_wrapper"> 
            <img src={jamroom1} className="img"></img>  
            <img src={jamroom2} className="img"></img>  
            </div> 
            <div className="img2_wrapper"> 
            <img src={jamroom3} className="img"></img>  
            <img src={jamroom4} className="img"></img>  
            </div>
            <Equipment {...this.props} equipment={this.state.equipment}/>
            </div>
        )
    }
}

export default Jam_Details;