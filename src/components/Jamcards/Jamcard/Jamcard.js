import React from 'react';
import './Jamcard.css';
const jamcard = (props) => {
    return (
        <React.Fragment>
            {
                props.cards.map(card => {
                    
                    return (<div key={card.location} className='Jamcard'>
                                <img alt ='jamroom' src={card.pic}/>
                                {/* <div className='nameloc'> */} 
                                <span className='name'>{card.name }</span>
                                <span className='location'>{card.location}</span>
                                {/* </div> */}
                                <span className='price'>Price range {card.price}</span>                    
                            </div>);
                })
            }

        </React.Fragment>
    )
}

export default jamcard;