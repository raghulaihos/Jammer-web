import React from 'react';
import './Card.css';
const Card = (props) => {
    return (
        <React.Fragment>
            {
                props.jampads.map(card => {
                    return (<div onClick={()=>props.click(card.name)} key={card.location} className='jamcard'>
                    <img alt ='jamroom' src={card.pic}/>
                    <span className='name'>{card.name }</span>
                    <span className='location'>{card.location}</span>
                    <span className='price'>Price range {card.price}</span>                    
                </div>);
                })
            }
        </React.Fragment>
    )
}

export default Card;