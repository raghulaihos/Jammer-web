import React from 'react';
import './Jamcards.css';
import Jamcard from './Jamcard/Jamcard';


const jamcards = (props) => {

    return (
        <div className='cardwrap'>
            <Jamcard cards={props.cards} />
        </div>
    )

}

export default jamcards;