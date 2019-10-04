import React from 'react';
import './Search.css';
import Searchcards from '../../components/Search/Searchcards/Searchcards';
import axios from '../../hoc/axios/axios-jamcards';

class Search extends React.Component{

    state = {
        search_cards: []
    };

    componentDidMount() {

        let token = localStorage.getItem('token');

        axios.get('/search', {
            headers:{
                Authorization:'Bearer ' + token
            }
        })
            .then(res => {
                const jam_cards = [];
                for(const key in res.data.jamcards){
                    jam_cards.push({
                        ...res.data.jamcards[key],
                        id: key
                    })
                }
                
                this.setState({jampads:jam_cards});
            }).catch(e=>console.log('error!!!',e));
    }

render(){
    return (
        <div className='Search'>
            <p>Available jam rooms for rent</p>
        </div>
    )
}
}

export default Search;