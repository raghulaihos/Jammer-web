import React from 'react';
import './Search.css';
import Searchcards from '../../components/Search/Searchcards/Searchcards';
import { Route } from 'react-router-dom';
import axios from '../../hoc/axios/axios-jamcards';
import Rent from '../../components/Rent/Rent';
import Searchbox from '../../components/Rent/Searchbox/Searchbox';
import Jam_Details from '../../components/Rent/Jam_Details/Jam_Details';
import jamroom1 from '../../assets/jamroom1.jpg';
import jamroom2 from '../../assets/jamroom2.jpg';
import jamroom3 from '../../assets/jamroom3.jpg';
import jamroom4 from '../../assets/jamroom4.jpg';
const jam_room_pics = [jamroom1, jamroom2, jamroom3, jamroom4];

class Search extends React.Component {

    state = {
        jam_pad: null,
        jampads: [],
        price: null,
        search_filter:[]
    };

    componentDidMount() {
        let token = localStorage.getItem('token');
        this.backListener = this.props.history.listen(location => {
            if (this.props.history.location.pathname == '/search') {
                this.setState({ jam_pad: null })
            }

        });

        axios.get('/search', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                const jam_cards = [];
                for (const key in res.data.jamcards) {
                    jam_cards.push({
                        ...res.data.jamcards[key],
                        pic: jam_room_pics[key],
                        id: key
                    })
                }

                this.setState({ jampads: jam_cards });
            }).catch(e => console.log('error!!!', e));



    }

    rent_click_handler = (jam_room, p) => {
        console.log('clicked!');
        this.setState({ jam_pad: jam_room, price: p }, () => {
            console.log(this.state.jam_pad);
            console.log(this.props.match.url + '/' + jam_room);
            this.props.history.push(this.props.match.url + '/' + jam_room);
            // this.props.history.push(this.props.match.url+'/raghu'); 
        });
    }

    searchbox_hander = (event) => {
        console.log(this.state.jampads)
        let arr = this.state.jampads.filter(val => {
            if (val.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                return val.name;
            }
        });
        if(event.target.value==''){
            this.setState({search_filter:[]});
        }else{
            this.setState({search_filter:arr});
        }
     
    }


    render() {
        let jampads;
        if (!this.state.jam_pad) {
            jampads = (<React.Fragment><p>Available jam rooms for rent</p>
                <Searchbox filt={this.state.search_filter} change={this.searchbox_hander} jampads={this.state.jampads}></Searchbox>
                <Rent click={this.rent_click_handler} jampads={this.state.jampads}></Rent>
            </React.Fragment>);
        }
        return (
            <div className='Search'>
                {jampads}
                <Route path={this.props.match.url + '/' + this.state.jam_pad}
                    render={props => <Jam_Details price={this.state.price} room_name={this.state.jam_pad}></Jam_Details>} />
            </div>
        )
    }
}

export default Search;